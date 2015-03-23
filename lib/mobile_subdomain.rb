class MobileSubdomain

  def self.matches?(request)
    request_domain_with_port =  request.host
    request_domain_with_port = request_domain_with_port + ":" + request.port.to_s if (request.port != 80 && request.port != 443)
    [Snappyguests::Application::MOBILE_DOMAIN].include?(request_domain_with_port)
  end

end