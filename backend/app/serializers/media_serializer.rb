class MediaSerializer < ActiveModel::Serializer
  attributes :id, :name, :url
  has_one :user
end
