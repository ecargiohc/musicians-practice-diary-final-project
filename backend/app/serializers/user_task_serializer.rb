class UserTaskSerializer < ActiveModel::Serializer
  attributes :id
  has_one :user
  has_one :task
end
