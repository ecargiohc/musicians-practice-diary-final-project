class CommentSerializer < ActiveModel::Serializer
  attributes :id, :feedback
  has_one :media
  has_one :user
end
