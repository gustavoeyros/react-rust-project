use std::sync::Arc;

use axum::{
    extract::{Path, State},
    http::StatusCode,
    response::IntoResponse,
    Json,
};

use crate::{
    model::{SaleModel, SaleModelResponse},
    schema::{CreateSaleSchema, UpdateSaleSchema},
    AppState,
};

pub async fn health_check_handler() -> impl IntoResponse {
    const MESSAGE: &str = "API Services";

    let json_response = serde_json::json!({
        "status": "ok",
        "message": MESSAGE
    });

    Json(json_response)
}

pub async fn get_all_sales_handler(
    State(data): State<Arc<AppState>>,
) -> Result<impl IntoResponse, (StatusCode, Json<serde_json::Value>)> {
    let pool = &data.db;

    let query_result = sqlx::query_as::<_, SaleModel>("SELECT * FROM sales")
        .fetch_all(pool)
        .await;

    match query_result {
        Ok(sales) => {
            let sales_response: Vec<SaleModelResponse> =
                sales.iter().map(to_sale_response).collect();

            let response = serde_json::json!({
                "status": "success",
                "data": {
                    "sales": sales_response
                }
            });

            Ok(Json(response))
        }
        Err(sqlx::Error::RowNotFound) => {
            let error_response = serde_json::json!({
                "status": "fail",
                "message": "No sales found"
            });
            Err((StatusCode::NOT_FOUND, Json(error_response)))
        }
        Err(e) => {
            let error_response = serde_json::json!({
                "status": "error",
                "message": format!("{:?}", e)
            });
            Err((StatusCode::INTERNAL_SERVER_ERROR, Json(error_response)))
        }
    }
}

pub async fn get_sale_by_id_handler(
    State(data): State<Arc<AppState>>,
    Path(sale_id): Path<i32>,
) -> Result<impl IntoResponse, (StatusCode, Json<serde_json::Value>)> {
    let pool = &data.db;

    let query_result = sqlx::query_as::<_, SaleModel>("SELECT * FROM sales WHERE id = $1")
        .bind(sale_id)
        .fetch_one(pool)
        .await;

    match query_result {
        Ok(sale) => {
            let sale_response = to_sale_response(&sale);

            let response = serde_json::json!({
                "status": "success",
                "data": {
                    "sale": sale_response
                }
            });

            Ok(Json(response))
        }
        Err(sqlx::Error::RowNotFound) => {
            let error_response = serde_json::json!({
                "status": "fail",
                "message": "Sale not found"
            });
            Err((StatusCode::NOT_FOUND, Json(error_response)))
        }
        Err(e) => {
            let error_response = serde_json::json!({
                "status": "error",
                "message": format!("{:?}", e)
            });
            Err((StatusCode::INTERNAL_SERVER_ERROR, Json(error_response)))
        }
    }
}

pub async fn create_sale_handler(
    State(data): State<Arc<AppState>>,
    Json(payload): Json<CreateSaleSchema>,
) -> Result<impl IntoResponse, (StatusCode, Json<serde_json::Value>)> {
    let pool = &data.db;

    let query_result = sqlx::query!(
        "INSERT INTO sales (product, quantity, unit_price)
         VALUES ($1, $2, $3) RETURNING id, product, quantity, unit_price, total",
        payload.product,
        payload.quantity,
        payload.unit_price,
    )
    .fetch_one(pool)
    .await;

    match query_result {
        Ok(sale) => {
            let sale_response = SaleModelResponse {
                id: sale.id,
                product: sale.product,
                quantity: sale.quantity,
                unit_price: sale.unit_price,
                total: sale.total,
            };

            let response = serde_json::json!({
                "status": "success",
                "data": {
                    "sale": sale_response
                }
            });

            Ok((StatusCode::CREATED, Json(response)))
        }
        Err(e) => {
            let error_response = serde_json::json!({
                "status": "error",
                "message": format!("{:?}", e)
            });
            Err((StatusCode::INTERNAL_SERVER_ERROR, Json(error_response)))
        }
    }
}

pub async fn update_sale_handler(
    State(data): State<Arc<AppState>>,
    Path(sale_id): Path<i32>,
    Json(payload): Json<UpdateSaleSchema>,
) -> Result<impl IntoResponse, (StatusCode, Json<serde_json::Value>)> {
    let pool = &data.db;

    let query_result = sqlx::query!(
        "UPDATE sales SET  product = COALESCE($1, product), quantity = COALESCE($2, quantity), unit_price = COALESCE($3, unit_price) WHERE id = $4 RETURNING id, product, quantity, unit_price, total",
        payload.product,
        payload.quantity,
        payload.unit_price,
        sale_id
    )
    .fetch_one(pool)
    .await;

    match query_result {
        Ok(sale) => {
            let sale_response = SaleModelResponse {
                id: sale.id,
                product: sale.product,
                quantity: sale.quantity,
                unit_price: sale.unit_price,
                total: sale.total,
            };

            let response = serde_json::json!({
                "status": "success",
                "data": {
                    "sale": sale_response
                }
            });

            Ok(Json(response))
        }
        Err(e) => {
            let error_response = serde_json::json!({
                "status": "error",
                "message": format!("{:?}", e)
            });
            Err((StatusCode::INTERNAL_SERVER_ERROR, Json(error_response)))
        }
    }
}

pub async fn delete_sale_handler(
    State(data): State<Arc<AppState>>,
    Path(sale_id): Path<i32>,
) -> Result<impl IntoResponse, (StatusCode, Json<serde_json::Value>)> {
    let pool = &data.db;

    let query_result = sqlx::query!("DELETE FROM sales WHERE id = $1 RETURNING id", sale_id)
        .fetch_one(pool)
        .await;

    match query_result {
        Ok(_) => {
            let response = serde_json::json!({
                "status": "success",
                "message": "Sale deleted successfully"
            });

            Ok(Json(response))
        }
        Err(e) => {
            let error_response = serde_json::json!({
                "status": "error",
                "message": format!("{:?}", e)
            });
            Err((StatusCode::INTERNAL_SERVER_ERROR, Json(error_response)))
        }
    }
}

fn to_sale_response(sale: &SaleModel) -> SaleModelResponse {
    SaleModelResponse {
        id: sale.id,
        product: sale.product.clone(),
        quantity: sale.quantity.clone(),
        unit_price: sale.unit_price.clone(),
        total: sale.total.clone(),
    }
}
