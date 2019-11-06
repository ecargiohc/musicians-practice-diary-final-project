class TaskNoteSerializer < ActiveModel::Serializer
  attributes :id, :objectives, :progress_report, :takeaway
  has_one :user_task
end
