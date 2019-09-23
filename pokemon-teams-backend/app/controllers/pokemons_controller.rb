require 'faker'

class PokemonsController < ApplicationController

  def index
    pokemon_list = Pokemon.all
    render json: pokemon_list.to_json(serialize_pokemon)
  end

  def show
    pokemon = Pokemon.find(params[:id])
    render json: pokemon.to_json(serialize_pokemon)
  end

  def create
    name = Faker::Name.first_name
    species = Faker::Games::Pokemon.name
    new_pokemon = Pokemon.create(nickname: name, species: species, trainer_id: params[:trainer_id])
    render json: new_pokemon
  end

  def destroy
    render json: Pokemon.find(params["id"]).destroy
  end




private
def serialize_pokemon
  {
    :except => [:created_at, :updated_at]
  }
end

# def pokemon_params
#   params.require(:pokemon).permit(:trainer_id)
# end


end
