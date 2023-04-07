exports.up = knex => knex.schema.createTable("menu", table =>{
  table.increments("id");
  table.text("name");
  table.text("avatar");
  table.decimal("preco", 10,2);
  table.text("description");
  table.text("category");
});


exports.down = knex => knex.schema.dropTable("menu");


// name, price, description, category