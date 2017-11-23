export const SYNONYMS_SEARCH = {
    name: '',
    synonym: '',
    synonym_type: '',
    status: '',
    scope: '',
    object: '',
    property: '',
    type: '',
    modified_by: '',
    ai_entity: '',
    origin_id: ''
};

export const TYPES = {
    ENTITY: '엔티티',
    OBJECT: '객체',
    PROPERTY: '속성',
    GROUP_PROPERTY: '그룹 속성',
    GENERAL: '일반'
};

export const STATUSES = {
    NORMAL: '정상',
    DELETED: '삭제',
    SUSPENDED: '중지'
};

export const SCOPES = {
    ALL: '전체 공개',
    PUBLIC: '외부 공개',
    SECTION: '섹션 공개',
    SEARCH: '통검 공개',
    AI: 'AI 공개',
    HIDDEN: '비공개'
};

export const SYNONYM_TYPES = {
    SYNONYM: {
        name: '공통 동의어',
        shortName: '공통',
        description: '검색, AI, 섹션에서 공통으로 사용하는 동의어. 추가/삭제 시 전체 서비스 공통 적용'
    },
    SEARCH_SYNONYM: {
        name: '검색 동의어',
        shortName: '검색'
    },
    VOICE_RECOGNITION: {
        name: '음성 인식 동의어',
        shortName: '음성'
    },
    AI: {
        name: 'AI 동의어',
        shortName: 'AI',
        group: true,
        types: {
            AI: {type : 'SYNONYM', include: true},
            AI_SEARCH: {type : 'SEARCH_SYNONYM', include: false}
        },
        description: '동의어 중 AI 미활용 동의어 제외, 별도 운영 동의어 추가 가능',
        tooltip: '동의어+AI추가동의어+AI제거동의어 통합된 결과'
    }/*,
    SECTION: {
        name: '섹션 동의어',
        shortName: '섹션',
        group: true
    }*/
};

export const AI_USE_SEARCH_SYNONYM = new Set([
    'datahub_homo/Person/name',
    'datahub_homo/PerformingGroup/name',
    'datahub_joins/Person/name',
    'encyclopedia_historic_figure/Person/name',
    'encyclopedia_king/Person/name',
    'encyclopedia_painter/Person/name',
    'datahub_tv_program/TVSeries/name',
    'datahub_tv_program/TVSeason/name',
    'datahub_tv_program/BroadcastService/name',
    'datahub_tv_series/TVSeries/name',
    'datahub_movie/Movie/name',
    'datahub_radio_program/RadioSeries/name',
    'datahub_radio_program/BroadcastService/name',
    'datahub_common_continents/Continent/name',
    'datahub_common_continents/State/name',
    'datahub_common_continents/Country/name',
    'datahub_common_cities/City/name'
]);

export const REQUIRED_FIELD = {
    PROPERTY: new Set(["ENTITY", "PROPERTY"])
};

export const URLS = {
    'datahub_homo/Person/name': 'http://search.daum.net/search?q={name}&w=tot&ppkey={origin_id}&rtmaxcoll=PRF',
    'datahub_homo/PerformingGroup/name': 'http://search.daum.net/search?q={name}&w=tot&ppkey={origin_id}&rtmaxcoll=PRF',
    'dunamu/Corporation/identifier': 'http://finance.daum.net/item/main.daum?code={origin_id}',
    'dunamu/Corporation/name': 'http://search.daum.net/search?nil_suggest=btn&w=tot&DA=SBC&q={name}&rtmaxcoll=1CI',
    'datahub_tv_program/TVSeries/name':	'http://movie.daum.net/tv/main?tvProgramId={origin_id}',
    'datahub_tv_program/TVSeason/name':	'http://movie.daum.net/tv/main?tvProgramId={origin_id}',
    'datahub_movie/Movie/name': 'http://movie.daum.net/moviedb/main?movieId={origin_id}',
    'melon/MusicRecording/name': 'http://www.melon.com/song/detail.htm?songId={origin_id}',
    'melon/MusicAlbum/name': 'http://www.melon.com/album/detail.htm?albumId={origin_id}',
    'melon/Person/name': 'http://www.melon.com/artist/detail.htm?artistId={origin_id}',
    'melon/MusicGroup/name': 'http://www.melon.com/artist/detail.htm?artistId={origin_id}',
    'datahub_radio_program/RadioSeries/name': 'http://search.daum.net/search?w=tot&sugo=&q={name}&rtmaxcoll=P3T',
    'daum_place/Place/name': 'http://place.map.daum.net/{origin_id}',
    'daum_sports/SportsLeague/name': 'http://search.daum.net/search?nil_suggest=btn&w=tot&DA=SBC&q={origin_id}&rtmaxcoll=ABT',
    'daum_sports/SportsTeam/name': 'http://search.daum.net/search?w=tot&DA=YZR&t__nil_searchbox=btn&sug=&sugo=&q={name}&rtmaxcoll=NGT',
    'encyclopedia_historic_figure/Person/name': 'http://m.100.daum.net/article/2/{origin_id}',
    'encyclopedia_king/Person/name': 'http://m.100.daum.net/article/3/{origin_id}',
    'datahub_common_continents/Continent/name': 'https://search.daum.net/search?w=tot&t__nil_searchbox=btn&sug=&sugo=&q={name}&rtmaxcoll=KMQ',
    'datahub_common_continents/Country/name': 'https://search.daum.net/search?w=tot&t__nil_searchbox=btn&sug=&sugo=&q={name}&rtmaxcoll=BXE',
    'datahub_common_cities/City/name': 'https://search.daum.net/search?w=tot&t__nil_searchbox=btn&sug=&sugo=&q={name}&rtmaxcoll=ESV',
};

export const URL_KEYS = ['source', 'object', 'property'];
export const URL_VALUES = ['name', 'origin_id'];

export const AI_ENTITIES = {
    'Person/name': 'personNE',
    'PerformingGroup/name': 'groupNE',
    'Person/jobTitle': 'jobNE',
    'Person/parent': 'relationType',
    'Person/children': 'relationType',
    'Person/sibling': 'relationType',
    'Person/spouse': 'relationType',
    'Person/relatedTo': 'relationType',
    'Person/worksFor': 'agency',
    'Person/workLocation': 'electoralDistrictNE',
    'Corporation/classifiedBy': 'stockMarketNE',
    'Corporation/identifier': 'stockCodeNE',
    'Corporation/name': 'stockNE',
    'Person/zodiac': 'zodiacNE',
    'Person/starSign': 'starSignNE',
    'PriceSpecification/priceCurrency': 'currencyNE',
    'TVSeries/name': 'tvPrgmNE',
    'TVSeason/name': 'tvPrgmNE',
    'TVEpisode/name': 'tvPrgmNE',
    'BroadcastService/name': {
        'datahub_tv_program': 'tvChannelNE',
        'datahub_radio_program': 'radioChannelNE',
    },
    'Movie/name': 'movieNE',
    'MusicRecording/name': 'songNE',
    'MusicAlbum/name': 'albumNE',
    'MusicGroup/name': 'groupNE',
    'MusicRecording/genre': 'genreNE',
    'RadioSeries/name': 'radioPrgmNE',
    'Place/name': 'placeNE',
    'Place/classifiedBy': 'placeType',
    'ArealZone/name': 'zoneNE',
    'NavigationPoi/name': 'naviGuideName',
    'Road/name': 'roadNE',
    'AdministrativeArea1/name': 'locD1NE',
    'AdministrativeArea2/name': 'locD2NE',
    'AdministrativeArea3/name': 'locD3NE',
    'AdministrativeArea4/name': 'locD4NE',
    'AdministrativeArea5/name': 'locD5NE',
    'SportsLeague/eventName': 'sportsNE',
    'SportsLeague/name': 'leagueNE',
    'SportsTeam/name': 'sportsTeamNE',
    'StadiumOrArena/name': 'stadiumNE',
    'Podcast/name': 'podcastNE',
    'Continent/name': 'continentNE',
    'Country/name': 'countryNE',
    'State/name': 'stateNE',
    'City/name': 'cityNE'
};