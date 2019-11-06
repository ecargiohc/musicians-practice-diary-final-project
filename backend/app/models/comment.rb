class Comment < ApplicationRecord
  belongs_to :media
  belongs_to :user
end
