
const sonarqubeScanner = require('sonarqube-scanner');


sonarqubeScanner({
  serverUrl: 'http://3.34.70.200:9000', // sonarqube server url
  token: '3a645207defb8a913f9ea931820741c22b6ee16a', // sonarqube user access token // 스크립트 실행 환경(ex. CI 서버)의 환경 변수로 추출?
  options: {
    'sonar.projectName': 'drama-timecard-front', // 이 이름으로 sonarqube에 프로젝트 생성
    'sonar.projectDescription': '...',
    'sonar.sources': 'src', // 정적 분석 대상 패키지
    //  'sonar.tests': 'test', // 실행 가능한 테스트 코드가 있다면, 패키지 기입
  },
}, () => process.exit());
