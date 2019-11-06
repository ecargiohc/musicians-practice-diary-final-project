# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_10_31_184634) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "comments", force: :cascade do |t|
    t.text "feedback"
    t.integer "media_id", null: false
    t.integer "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["media_id"], name: "index_comments_on_media_id"
    t.index ["user_id"], name: "index_comments_on_user_id"
  end

  create_table "media", force: :cascade do |t|
    t.string "name"
    t.string "url"
    t.integer "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_media_on_user_id"
  end

  create_table "sub_tasks", force: :cascade do |t|
    t.string "tempo"
    t.string "rhythm"
    t.text "articulation"
    t.text "dynamics"
    t.text "phrasing"
    t.text "style"
    t.text "intonation"
    t.integer "task_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["task_id"], name: "index_sub_tasks_on_task_id"
  end

  create_table "task_notes", force: :cascade do |t|
    t.text "objectives"
    t.text "progress_report"
    t.text "takeaway"
    t.integer "user_task_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_task_id"], name: "index_task_notes_on_user_task_id"
  end

  create_table "tasks", force: :cascade do |t|
    t.text "scales"
    t.text "arpeggios"
    t.text "etudes"
    t.text "sight_reading"
    t.text "solo"
    t.text "concerto"
    t.text "excerpts"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "user_tasks", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "task_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["task_id"], name: "index_user_tasks_on_task_id"
    t.index ["user_id"], name: "index_user_tasks_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "password_digest"
    t.string "instrument"
    t.string "resume"
    t.string "photo"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  add_foreign_key "comments", "media", column: "media_id"
  add_foreign_key "comments", "users"
  add_foreign_key "media", "users"
  add_foreign_key "sub_tasks", "tasks"
  add_foreign_key "task_notes", "user_tasks"
  add_foreign_key "user_tasks", "tasks"
  add_foreign_key "user_tasks", "users"
end
