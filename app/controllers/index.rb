get '/' do
  # Look in app/views/index.erb
  erb :index
end

post '/create_players' do
  p1 = Player.find_or_create_by(name: params[:player1])
  p2 = Player.find_or_create_by(name: params[:player2])


  redirect to("/game?p1=#{p1.id}&p2=#{p2.id}")
end

get '/game' do
  @p1_name = Player.return_name(params[:p1])
  @p2_name = Player.return_name(params[:p2])

  erb :game
end

post '/log_winner' do
  p1_id = Player.find_by_name(params[:p1]).id
  p2_id = Player.find_by_name(params[:p2]).id
  winner_id = Player.find_by_name(params[:winner]).id


  game = Game.create(player1_id: p1_id,
                     player2_id: p2_id,
                     winner_id: winner_id,
                     game_time: params[:time])

  game.id.to_s

end

get '/results' do
  @p1_id = Game.find(params[:game_id].to_i).player1_id
  @p2_id = Game.find(params[:game_id].to_i).player2_id
  @p1name = Player.return_name(Game.find(params[:game_id].to_i).player1_id)

  @p2name = Player.return_name(Game.find(params[:game_id].to_i).player2_id)

  @winner_name = Player.return_name(Game.find(params[:game_id].to_i).winner_id)
  @time = Game.find(params[:game_id].to_i).game_time

  erb :results
end
