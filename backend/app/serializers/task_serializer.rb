class TaskSerializer < ActiveModel::Serializer
  attributes :id, :scales, :arpeggios, :etudes, :sight_reading, :solo, :concerto, :excerpts, :created_at, :updated_at
end
