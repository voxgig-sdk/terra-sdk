# Terra SDK exists test

require "minitest/autorun"
require_relative "../Terra_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = TerraSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
