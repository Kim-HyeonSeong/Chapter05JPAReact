package spring.conf;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

import lombok.Getter;
import lombok.Setter;

@Configuration
@PropertySource("classpath:naver.properties")
@ConfigurationProperties(prefix="ncp")
@Setter
@Getter
public class NaverConfiguration {
	private @Value("${ncp.accessKey}") String accesskey;
	private @Value("${ncp.secretKey}") String secretkey;
	private @Value("${ncp.regionName}") String regionName;
	private @Value("${ncp.endPoint}") String endPoint;
}
