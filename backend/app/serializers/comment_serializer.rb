class CommentSerializer < ActiveModel::Serializer
  attributes :id, :feedback, :created_at
  has_one :media
  has_one :user
end
