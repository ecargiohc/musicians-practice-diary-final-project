class MediaSerializer < ActiveModel::Serializer
  attributes :id, :name, :url, :created_at
  has_one :user
end
