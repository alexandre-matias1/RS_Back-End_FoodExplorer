exports.up = knex => knex.schema.createTable("request", table =>{
    table.increments("id");
    table.integer("user_id").references("id").inTable("users");
    table.integer("menu_id").references("id").inTable("menu");
    table.float("amount");
    table.integer("status");
  });
  
  
  exports.down = knex => knex.schema.dropTable("request");
