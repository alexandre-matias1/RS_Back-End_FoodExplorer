exports.up = knex => knex.schema.createTable("request", table =>{
    table.increments("id");
    table.integer("user_id").references("id").inTable("users");
    table.text("menu_id");
    table.float("amount");
    table.integer("status");
  });
  
  
  exports.down = knex => knex.schema.dropTable("request");
