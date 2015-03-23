class MobileSubdomain

  def self.matches?(request)
    request_domain_with_port =  request.host
    request_domain_with_port = request_domain_with_port + ":" + request.port.to_s if (request.port != 80 && request.port != 443)
    request_domain_with_port.include?(Snappyguests::Application.config.mobile_domain)
  end

end