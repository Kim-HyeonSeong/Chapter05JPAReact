package user.bean;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "userimage")
@Data
public class UserUploadDTO {
	@Id
	@GeneratedValue(strategy= GenerationType.IDENTITY) //MySQL의 AUTO-INCREMENT를 사용하여 자동으로 시쿼스 적용
	@Column(name="seq")
	private int seq;
	
	@Column(name="imagename", length=50)
	private String imageName;
	
	@Column(name="imagecontent", length=4000)
	private String imageContent;
	
	@Column(name="imagefilename", nullable = false, length=100)
	private String imageFileName;
	
	@Column(name="imageoriginalname", nullable = false, length=100)
	private String imageOriginalName;
}

/*
UUID 란?

UUID(Universally Unique IDentifier)는 네트워크상에서 고유성을 보장하는 ID를 만들기 위한 표준 규약이다.
UUID는 다음과 같이 32개의 16진수로 구성되며 5개의 그룹으로 표시되고 각 그룹은 붙임표(-)로 구분한다.

280a8a4d-a27f-4d01-b031-2a003cc4c039

적어도 서기 3400년까지는 같은 UUID가 생성될 수 없다고 한다.
이러한 이유로 UUID를 데이터베이스의 프라이머리 키(primary key)로 종종 사용한다.

위에서 UUID를 이용하여 이미지 등록할 때 홈런볼.jpg을 업로드 했더니 storage 폴더에
447e3573-01ca-4a68-be6a-ddce14bc07c8 으로 등록 된 것을 확인 할 수 있다
 */