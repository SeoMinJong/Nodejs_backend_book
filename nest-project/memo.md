#nestjs

1. 구분
nestjs는 파이프, 가드, 컨트롤러, 서비스, 리포지터리로 구분한다.
이 중에 가장 필수적인 요소를 꼽자면 컨트롤러로 모듈과 컨트롤러가 있어야 아무 로직이 없는 웹 서버를 띄울 수 있다.
컨트롤러 - 라우터의 역할을 담당하며 http Method와 경로를 통해 라우팅한다.
모듈 - 각 서비스를 담당하는 객체, 각 컨트롤러를 서비스 단위로 밀집하고 이를 관리하기 위한 단위이다. 루트 모듈로부터 각 서비스에 대한 모듈을 이어나간다.

2. nestjs 디렉토리 구성
현 프로젝트에서 blog라는 프로젝트를 진행하는데 nestjs new cli를 통해 디렉토리 구성을 진행했다.
git 관련 .gitignore과 코드 포멧팅 관련 .prettierrc, nestjs-cli 관리 관련 nset-cli.json 파일이 있고
src와 test 폴더가 생성되며 src 폴더에 서비스에 관한 컨트롤러, 모듈, 서비스, 메인 파일이 생성된다.
typescript를 위한 설정을 위한 tsconfig.json, tsconfig.build.json 파일이 생성된다.