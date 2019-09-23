class TrainersController < ApplicationController

  def index
    trainers = Trainer.all
    render json: trainers.to_json(serialize_trainers)
  end

  def show
    trainer = Trainer.find(params[:id])
    render json: trainer.to_json(serialize_trainers)
  end




private
def serialize_trainers
  {
    :except => [:created_at, :updated_at],
    :include => {:pokemons => {
      :except => [:created_at, :updated_at, :trainer_id]
      }
    }
  }
end


end
