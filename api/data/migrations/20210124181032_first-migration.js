exports.up = async (knex) => {
  await knex.schema
    .createTable('users', (users) => {
      users.increments('user_id')
      users.string('username', 200).notNullable()
      users.string('password', 200).notNullable()
      users.timestamps(false, true)
    })
  .createTable("potlucks", (potlucks) => {
    potlucks.increments();
    potlucks.string("title", 128).notNullable().unique();
    potlucks.date("date").notNullable().unique();
    potlucks.time("time").notNullable().unique();
    potlucks.string("location", 128).notNullable().unique();
    potlucks.timestamps(false, true)
  })
}

exports.down = async (knex) => {
  await knex.schema
    .dropTableIfExists('potlucks')
    .dropTableIfExists('users');
}
