use std::sync::Arc;

use axum::{
    routing::{delete, get, patch, post},
    Router,
};

use crate::{
    handler::{
        create_sale_handler, delete_sale_handler, get_all_sales_handler, get_sale_by_id_handler,
        health_check_handler, update_sale_handler,
    },
    AppState,
};

pub fn create_router(app_state: Arc<AppState>) -> Router {
    Router::new()
        .route("/api/sales", get(get_all_sales_handler))
        .route("/api/sales/:id", get(get_sale_by_id_handler))
        .route("/api/sales", post(create_sale_handler))
        .route("/api/sales/:id", delete(delete_sale_handler))
        .route("/api/sales/:id", patch(update_sale_handler))
        .route("/api/healthcheck", get(health_check_handler))
        .with_state(app_state)
}
