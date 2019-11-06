class Task < ApplicationRecord
    has_many :user_tasks
    has_many :sub_tasks
    # has_many :sub_tasks, through: :user_tasks ?
end
