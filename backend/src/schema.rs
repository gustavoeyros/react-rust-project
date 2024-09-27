use serde::{Deserialize, Serialize};
use sqlx::types::BigDecimal;

#[derive(Serialize, Deserialize, Debug)]
pub struct CreateSaleSchema {
    pub product: String,
    pub quantity: BigDecimal,
    pub unit_price: BigDecimal,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct UpdateSaleSchema {
    pub product: Option<String>,
    pub quantity: Option<BigDecimal>,
    pub unit_price: Option<BigDecimal>,
}
