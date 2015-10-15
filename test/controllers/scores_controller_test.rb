require 'test_helper'

class ScoresControllerTest < ActionController::TestCase
  test "should get submit" do
    get :submit
    assert_response :success
  end

end
