exports.up = knex => knex.schema.createTable("notes", table => {
    table.increments("id")
    table.text("title")
    table.text("description")

    table.integer("rating")
    table.integer("user_id").references("id").inTable("users")

    table.timestamp("created_at").defaultTo(knex.raw("(strftime('%d/%m/%Y %H:%M:%S', 'now', 'localtime'))"));
    table.timestamp("updated_at").defaultTo(knex.raw("(strftime('%d/%m/%Y %H:%M:%S', 'now', 'localtime'))"));
})






exports.down = knex => knex.schema.dropTable("notes")
