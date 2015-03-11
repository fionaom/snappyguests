# config valid only for current version of Capistrano
lock '3.4.0'

set :application, 'snappyguests'
set :repo_url, 'git@github.com:fionaom/snappyguests.git'

#set :repository, "~/projects/snappyguests/"
#set :local_repository, "~/projects/snappyguests/"

# Default branch is :master
# ask :branch, `git rev-parse --abbrev-ref HEAD`.chomp

# Default deploy_to directory is /var/www/my_app_name
set :deploy_to, '/home/app/snappyguests'

# Default value for :scm is :git
# set :scm, :git

# Default value for :format is :pretty
# set :format, :pretty

# Default value for :log_level is :debug
# set :log_level, :debug

# Default value for :pty is false
 set :pty, true

# Default value for :linked_files is []
 set :linked_files, fetch(:linked_files, []).push('config/database.yml')

# Default value for linked_dirs is []
# set :linked_dirs, fetch(:linked_dirs, []).push('log', 'tmp/pids', 'tmp/cache', 'tmp/sockets', 'vendor/bundle', 'public/system')

# Default value for default_env is {}
# set :default_env, { path: "/opt/ruby/bin:$PATH" }

# Default value for keep_releases is 5
# set :keep_releases, 5

namespace :deploy do

  after :restart, :clear_cache do
    on roles(:web), in: :groups, limit: 3, wait: 10 do
      # Here we can do anything such as:
      # within release_path do
      #   execute :rake, 'cache:clear'
      # end
    end
  end

end

#desc "SSH in to the server as app user."
#task :ssh do
 # exec("ssh -i ~/.ssh/snappyguests.pem app@#{app_ip}")
#end

#ssh into the server as the app user via: cap environement ssh
desc "SSH in to the server as app user."
task :ssh do
  exec("ssh -i ~/.ssh/app.pem app@52.16.208.43")
end

desc "SSH in to the server as app user."
task :ssh_ec2_user do
  exec("ssh -i ~/.ssh/snappyguests.pem ec2-user@52.16.208.43")
end

# lib/capistrano/tasks/agent_forwarding.rake
desc "Check if agent forwarding is working"
task :forwarding do
  on roles(:all) do |h|
    if test("env | grep SSH_AUTH_SOCK")
      info "Agent forwarding is up to #{h}"
    else
      error "Agent forwarding is NOT up to #{h}"
    end
  end
end