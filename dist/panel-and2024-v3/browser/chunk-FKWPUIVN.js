import{Me as m,Ne as t,Oe as o,Pe as s}from"./chunk-M4WL67FH.js";var v={lessThanXSeconds:{one:"menos de un segundo",other:"menos de {{count}} segundos"},xSeconds:{one:"1 segundo",other:"{{count}} segundos"},halfAMinute:"medio minuto",lessThanXMinutes:{one:"menos de un minuto",other:"menos de {{count}} minutos"},xMinutes:{one:"1 minuto",other:"{{count}} minutos"},aboutXHours:{one:"alrededor de 1 hora",other:"alrededor de {{count}} horas"},xHours:{one:"1 hora",other:"{{count}} horas"},xDays:{one:"1 d\xEDa",other:"{{count}} d\xEDas"},aboutXWeeks:{one:"alrededor de 1 semana",other:"alrededor de {{count}} semanas"},xWeeks:{one:"1 semana",other:"{{count}} semanas"},aboutXMonths:{one:"alrededor de 1 mes",other:"alrededor de {{count}} meses"},xMonths:{one:"1 mes",other:"{{count}} meses"},aboutXYears:{one:"alrededor de 1 a\xF1o",other:"alrededor de {{count}} a\xF1os"},xYears:{one:"1 a\xF1o",other:"{{count}} a\xF1os"},overXYears:{one:"m\xE1s de 1 a\xF1o",other:"m\xE1s de {{count}} a\xF1os"},almostXYears:{one:"casi 1 a\xF1o",other:"casi {{count}} a\xF1os"}},b=function(e,i,a){var r,d=v[e];return typeof d=="string"?r=d:i===1?r=d.one:r=d.other.replace("{{count}}",i.toString()),a!=null&&a.addSuffix?a.comparison&&a.comparison>0?"en "+r:"hace "+r:r},l=b;var p={full:"EEEE, d 'de' MMMM 'de' y",long:"d 'de' MMMM 'de' y",medium:"d MMM y",short:"dd/MM/y"},g={full:"HH:mm:ss zzzz",long:"HH:mm:ss z",medium:"HH:mm:ss",short:"HH:mm"},y={full:"{{date}} 'a las' {{time}}",long:"{{date}} 'a las' {{time}}",medium:"{{date}}, {{time}}",short:"{{date}}, {{time}}"},P={date:m({formats:p,defaultWidth:"full"}),time:m({formats:g,defaultWidth:"full"}),dateTime:m({formats:y,defaultWidth:"full"})},u=P;var w={lastWeek:"'el' eeee 'pasado a la' p",yesterday:"'ayer a la' p",today:"'hoy a la' p",tomorrow:"'ma\xF1ana a la' p",nextWeek:"eeee 'a la' p",other:"P"},M={lastWeek:"'el' eeee 'pasado a las' p",yesterday:"'ayer a las' p",today:"'hoy a las' p",tomorrow:"'ma\xF1ana a las' p",nextWeek:"eeee 'a las' p",other:"P"},W=function(e,i,a,r){return i.getUTCHours()!==1?M[e]:w[e]},c=W;var j={narrow:["AC","DC"],abbreviated:["AC","DC"],wide:["antes de cristo","despu\xE9s de cristo"]},x={narrow:["1","2","3","4"],abbreviated:["T1","T2","T3","T4"],wide:["1\xBA trimestre","2\xBA trimestre","3\xBA trimestre","4\xBA trimestre"]},D={narrow:["e","f","m","a","m","j","j","a","s","o","n","d"],abbreviated:["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic"],wide:["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"]},k={narrow:["d","l","m","m","j","v","s"],short:["do","lu","ma","mi","ju","vi","s\xE1"],abbreviated:["dom","lun","mar","mi\xE9","jue","vie","s\xE1b"],wide:["domingo","lunes","martes","mi\xE9rcoles","jueves","viernes","s\xE1bado"]},C={narrow:{am:"a",pm:"p",midnight:"mn",noon:"md",morning:"ma\xF1ana",afternoon:"tarde",evening:"tarde",night:"noche"},abbreviated:{am:"AM",pm:"PM",midnight:"medianoche",noon:"mediodia",morning:"ma\xF1ana",afternoon:"tarde",evening:"tarde",night:"noche"},wide:{am:"a.m.",pm:"p.m.",midnight:"medianoche",noon:"mediodia",morning:"ma\xF1ana",afternoon:"tarde",evening:"tarde",night:"noche"}},z={narrow:{am:"a",pm:"p",midnight:"mn",noon:"md",morning:"de la ma\xF1ana",afternoon:"de la tarde",evening:"de la tarde",night:"de la noche"},abbreviated:{am:"AM",pm:"PM",midnight:"medianoche",noon:"mediodia",morning:"de la ma\xF1ana",afternoon:"de la tarde",evening:"de la tarde",night:"de la noche"},wide:{am:"a.m.",pm:"p.m.",midnight:"medianoche",noon:"mediodia",morning:"de la ma\xF1ana",afternoon:"de la tarde",evening:"de la tarde",night:"de la noche"}},H=function(e,i){var a=Number(e);return a+"\xBA"},T={ordinalNumber:H,era:t({values:j,defaultWidth:"wide"}),quarter:t({values:x,defaultWidth:"wide",argumentCallback:function(e){return Number(e)-1}}),month:t({values:D,defaultWidth:"wide"}),day:t({values:k,defaultWidth:"wide"}),dayPeriod:t({values:C,defaultWidth:"wide",formattingValues:z,defaultFormattingWidth:"wide"})},h=T;var F=/^(\d+)(º)?/i,L=/\d+/i,N={narrow:/^(ac|dc|a|d)/i,abbreviated:/^(a\.?\s?c\.?|a\.?\s?e\.?\s?c\.?|d\.?\s?c\.?|e\.?\s?c\.?)/i,wide:/^(antes de cristo|antes de la era com[uú]n|despu[eé]s de cristo|era com[uú]n)/i},V={any:[/^ac/i,/^dc/i],wide:[/^(antes de cristo|antes de la era com[uú]n)/i,/^(despu[eé]s de cristo|era com[uú]n)/i]},X={narrow:/^[1234]/i,abbreviated:/^T[1234]/i,wide:/^[1234](º)? trimestre/i},E={any:[/1/i,/2/i,/3/i,/4/i]},R={narrow:/^[efmajsond]/i,abbreviated:/^(ene|feb|mar|abr|may|jun|jul|ago|sep|oct|nov|dic)/i,wide:/^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)/i},A={narrow:[/^e/i,/^f/i,/^m/i,/^a/i,/^m/i,/^j/i,/^j/i,/^a/i,/^s/i,/^o/i,/^n/i,/^d/i],any:[/^en/i,/^feb/i,/^mar/i,/^abr/i,/^may/i,/^jun/i,/^jul/i,/^ago/i,/^sep/i,/^oct/i,/^nov/i,/^dic/i]},S={narrow:/^[dlmjvs]/i,short:/^(do|lu|ma|mi|ju|vi|s[áa])/i,abbreviated:/^(dom|lun|mar|mi[ée]|jue|vie|s[áa]b)/i,wide:/^(domingo|lunes|martes|mi[ée]rcoles|jueves|viernes|s[áa]bado)/i},Y={narrow:[/^d/i,/^l/i,/^m/i,/^m/i,/^j/i,/^v/i,/^s/i],any:[/^do/i,/^lu/i,/^ma/i,/^mi/i,/^ju/i,/^vi/i,/^sa/i]},q={narrow:/^(a|p|mn|md|(de la|a las) (mañana|tarde|noche))/i,any:/^([ap]\.?\s?m\.?|medianoche|mediodia|(de la|a las) (mañana|tarde|noche))/i},O={any:{am:/^a/i,pm:/^p/i,midnight:/^mn/i,noon:/^md/i,morning:/mañana/i,afternoon:/tarde/i,evening:/tarde/i,night:/noche/i}},_={ordinalNumber:s({matchPattern:F,parsePattern:L,valueCallback:function(e){return parseInt(e,10)}}),era:o({matchPatterns:N,defaultMatchWidth:"wide",parsePatterns:V,defaultParseWidth:"any"}),quarter:o({matchPatterns:X,defaultMatchWidth:"wide",parsePatterns:E,defaultParseWidth:"any",valueCallback:function(e){return e+1}}),month:o({matchPatterns:R,defaultMatchWidth:"wide",parsePatterns:A,defaultParseWidth:"any"}),day:o({matchPatterns:S,defaultMatchWidth:"wide",parsePatterns:Y,defaultParseWidth:"any"}),dayPeriod:o({matchPatterns:q,defaultMatchWidth:"any",parsePatterns:O,defaultParseWidth:"any"})},f=_;var Q={code:"es",formatDistance:l,formatLong:u,formatRelative:c,localize:h,match:f,options:{weekStartsOn:1,firstWeekContainsDate:1}},ie=Q;export{ie as a};
