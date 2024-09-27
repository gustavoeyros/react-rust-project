use bigdecimal::BigDecimal;
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize, sqlx::FromRow)]
#[allow(non_snake_case)]
pub struct SaleModel {
    pub id: i32,
    pub product: String,
    pub quantity: BigDecimal,
    pub unit_price: BigDecimal,
    pub total: Option<BigDecimal>,
}

#[derive(Debug, Deserialize, Serialize)]
#[allow(non_snake_case)]
pub struct SaleModelResponse {
    pub id: i32,
    pub product: String,
    pub quantity: BigDecimal,
    pub unit_price: BigDecimal,
    pub total: Option<BigDecimal>,
}
