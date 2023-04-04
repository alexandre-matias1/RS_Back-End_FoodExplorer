exports.up = knex => knex.schema.createTable("ingredients", table =>{
    table.increments("id");
    table.text("name");
    table.integer("menu_id").references("id").inTable("menu")
  });
  
  
  exports.down = knex => knex.schema.dropTable("ingredients");
  
  
  // name, price, description, category