### React Dim Actions

+ ##### Dim 처리되는 배경과 여러가지 액션으로 구성되는 라이브러리
* * *
   
+ DimArea
  Dim처리가 되는 Area에 대한 설정
> ###### AreaInfo
> DimArea에 대한 정보
> > property|require|type|descripton|
> > |:---|:---:|:---:|:---|
> > |active|require|Boolean|Dim 노출 여부|
> > |clearAction|option|() => void|Dim 영역 클릭에 대한 Dim 노출 해제 함수|
> > |immediateClear|option|Boolean|Dim 영역 바로 해제에 대한 여부|
> > |spread|option|Spread|DimArea가 전개되는 방식|
> > |zIndex|option|Number|DimArea의 zIndex(Default 150)|
> ###### Spread
> DimArea가 전개되는 방식에 대한 정보
> > property|require|type|descripton|
> > |:---|:---:|:---:|:---|
> > |direction|option|Enum(left,right,top,bottom)|DimArea의 전개 방향|
> > |delay|option|Number|DimArea 전개전 딜레이|
> > |duration|option|Number|DimArea 전개 시간|

+ GridActArea
  DimArea 정중앙에 위치를 잡기 위한 Area
> ###### ActionSpread
> GridActArea에 대한 정보
> > property|require|type|descripton|
> > |:---|:---:|:---:|:---|
> > |active|require|Boolean|ActArea 노출 여부|
