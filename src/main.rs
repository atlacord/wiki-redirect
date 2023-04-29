#![feature(decl_macro)]
pub mod routes;

#[macro_use]
extern crate rocket;
extern crate json;
use rocket::response::Redirect;
use rocket::response::content;

#[get("/")]
fn index() -> Redirect {
    Redirect::to(format!("https://wiki.atla.sh"))
}

#[get("/pages")]
fn pages() -> content::Json<String> {
    return content::Json(json::stringify(routes::pages()));
}

#[get("/discord")]
fn discord() -> Redirect {
    Redirect::to(format!("https://discord.gg/QBKxgsfG7r"))
}

fn listen() -> () {
    rocket::ignite()
    .mount("/", routes![index, pages, discord])
    .launch();
}

fn main () {
    listen();
}