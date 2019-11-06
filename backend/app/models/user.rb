class User < ApplicationRecord
    has_many :user_tasks
    # the comments they made:
    has_many :comments
    # has_many :comments, through: :media ?
    has_many :tasks, through: :user_tasks
    has_many :media
    # the comments they received from others: (?)
    has_many :comments, through: :media
   
    has_secure_password
    # for bcrypt
end
