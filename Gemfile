source "https://rubygems.org"

gem "cocoapods"
gem "fastlane"
gem "dotenv"

# gemspec path: File.expand_path('~/projects/fastlane')


plugins_path = File.join(File.dirname(__FILE__), 'fastlane', 'Pluginfile')
eval_gemfile(plugins_path) if File.exist?(plugins_path)
