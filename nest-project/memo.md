# nestjs

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

3. nestjs 환경변수
nodejs에서 DB 정보와 같은 민감한 정보를 환경변수인 .env을 통해 관리하는데 nestjs에서 또한 이러한 방식으로 환경변수를 관리한다.
.env의 위치는 기본적으로 프로젝트 root 폴더에 위치하며 만약 위치를 수정하고 싶다면 코드에 나온것처럼 envFilePath에 해당 경로를 작성하면 된다.
.env은 변수=값 형태로 작성하면 되고 isGlobal을 통해 모듈과 하위모듈 전역에서 사용할 수 있도록 할 수 있다. (본 코드에서는 사용하지 않았다.)
물론 .gitgnore에 .env이나 *.env을 설정하여 환경변수 파일이 push되지 않도록 주의해야한다.

+) import후 해당 모듈에서 사용할 경우 주의점
nestjs는 typescript를 기반하고 있기때문에 비동기함수를 적용하지 않는다면 임포트한 ConfigModule이 임포트되지 않고 .env의 변수들을 불러올 수 있다.
때문에 ./nest-project/blog/src/app.module.ts 코드에서 확인할 수 있다시피 MongooseModule을 연결하기 위해 MongooseModule.forRootAsync를 통해 ConfigModule이 먼저 임포트될 수 있도록 구성되었다.
(처음엔 그냥 forRoot를 사용해서 undefined를 띄우는 불상사가 생겼다.)