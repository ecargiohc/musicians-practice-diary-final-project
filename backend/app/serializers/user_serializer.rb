class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :instrument, :resume, :photo
  # hid :password and :id
end
