class SubTaskSerializer < ActiveModel::Serializer
  attributes :id, :tempo, :rhythm, :articulation, :dynamics, :phrasing, :style, :intonation
  has_one :task
end
