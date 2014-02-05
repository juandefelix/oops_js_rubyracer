class Player < ActiveRecord::Base
  validates :name, uniqueness: true

  def self.return_name(id)
    self.find(id).name
  end

end
