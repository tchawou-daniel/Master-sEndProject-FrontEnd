export enum ObjectsEnum {
  statementPeriod = 'statementPeriod',
  statement = 'statement',
  planAssignement = 'planAssignement',
  teamAssignement = 'teamAssignement',
  filter = 'filter',
  user = 'user',
  team = 'team',
  plan = 'plan',
  row = '$row',
  statementMetric = 'statementMetric',
}

export enum VariableObjectsEnum {
  statement = 'statement',
  object = 'object',

  user = 'user',
  team = 'team',
  plan = 'plan',
}

export enum PeriodFrequencyEnum {
  null = 'null',
  month = 'month',
  quarter = 'quarter',
  year = 'year',
}

export enum FormatsEnum {
  number = 'number',
  currency = 'currency',
  percent = 'percent',
  date = 'date',
  'date-time' = 'date-time',
  table = 'table',
  text = 'text',
  boolean = 'boolean',
}

export enum LanguagesEnum {
  en = 'en',
  fr = 'fr',
}

export enum HidableElementVisibility {
  ON_DISPLAY = 'ON_DISPLAY',
  AVAILABLE = 'AVAILABLE',
}

export enum CurrencySymbolsEnum {
  AED = 'AED',
  AFN = 'AFN',
  ALL = 'ALL',
  AMD = 'AMD',
  ANG = 'ANG',
  AOA = 'AOA',
  ARS = 'ARS',
  AUD = 'AUD',
  AWG = 'AWG',
  AZN = 'AZN',
  BAM = 'BAM',
  BBD = 'BBD',
  BDT = 'BDT',
  BGN = 'BGN',
  BHD = 'BHD',
  BIF = 'BIF',
  BMD = 'BMD',
  BND = 'BND',
  BOB = 'BOB',
  BRL = 'BRL',
  BSD = 'BSD',
  BTC = 'BTC',
  BTN = 'BTN',
  BWP = 'BWP',
  BYN = 'BYN',
  BYR = 'BYR',
  BZD = 'BZD',
  CAD = 'CAD',
  CDF = 'CDF',
  CHF = 'CHF',
  CLF = 'CLF',
  CLP = 'CLP',
  CNY = 'CNY',
  COP = 'COP',
  CRC = 'CRC',
  CUC = 'CUC',
  CUP = 'CUP',
  CVE = 'CVE',
  CZK = 'CZK',
  DJF = 'DJF',
  DKK = 'DKK',
  DOP = 'DOP',
  DZD = 'DZD',
  EGP = 'EGP',
  ERN = 'ERN',
  ETB = 'ETB',
  EUR = 'EUR',
  FJD = 'FJD',
  FKP = 'FKP',
  GBP = 'GBP',
  GEL = 'GEL',
  GGP = 'GGP',
  GHS = 'GHS',
  GIP = 'GIP',
  GMD = 'GMD',
  GNF = 'GNF',
  GTQ = 'GTQ',
  GYD = 'GYD',
  HKD = 'HKD',
  HNL = 'HNL',
  HRK = 'HRK',
  HTG = 'HTG',
  HUF = 'HUF',
  IDR = 'IDR',
  ILS = 'ILS',
  IMP = 'IMP',
  INR = 'INR',
  IQD = 'IQD',
  IRR = 'IRR',
  ISK = 'ISK',
  JEP = 'JEP',
  JMD = 'JMD',
  JOD = 'JOD',
  JPY = 'JPY',
  KES = 'KES',
  KGS = 'KGS',
  KHR = 'KHR',
  KMF = 'KMF',
  KPW = 'KPW',
  KRW = 'KRW',
  KWD = 'KWD',
  KYD = 'KYD',
  KZT = 'KZT',
  LAK = 'LAK',
  LBP = 'LBP',
  LKR = 'LKR',
  LRD = 'LRD',
  LSL = 'LSL',
  LTL = 'LTL',
  LVL = 'LVL',
  LYD = 'LYD',
  MAD = 'MAD',
  MDL = 'MDL',
  MGA = 'MGA',
  MKD = 'MKD',
  MMK = 'MMK',
  MNT = 'MNT',
  MOP = 'MOP',
  MRO = 'MRO',
  MUR = 'MUR',
  MVR = 'MVR',
  MWK = 'MWK',
  MXN = 'MXN',
  MYR = 'MYR',
  MZN = 'MZN',
  NAD = 'NAD',
  NGN = 'NGN',
  NIO = 'NIO',
  NOK = 'NOK',
  NPR = 'NPR',
  NZD = 'NZD',
  OMR = 'OMR',
  PAB = 'PAB',
  PEN = 'PEN',
  PGK = 'PGK',
  PHP = 'PHP',
  PKR = 'PKR',
  PLN = 'PLN',
  PYG = 'PYG',
  QAR = 'QAR',
  RON = 'RON',
  RSD = 'RSD',
  RUB = 'RUB',
  RWF = 'RWF',
  SAR = 'SAR',
  SBD = 'SBD',
  SCR = 'SCR',
  SDG = 'SDG',
  SEK = 'SEK',
  SGD = 'SGD',
  SHP = 'SHP',
  SLL = 'SLL',
  SOS = 'SOS',
  SRD = 'SRD',
  STD = 'STD',
  SVC = 'SVC',
  SYP = 'SYP',
  SZL = 'SZL',
  THB = 'THB',
  TJS = 'TJS',
  TMT = 'TMT',
  TND = 'TND',
  TOP = 'TOP',
  TRY = 'TRY',
  TTD = 'TTD',
  TWD = 'TWD',
  TZS = 'TZS',
  UAH = 'UAH',
  UGX = 'UGX',
  USD = 'USD',
  UYU = 'UYU',
  UZS = 'UZS',
  VEF = 'VEF',
  VND = 'VND',
  VUV = 'VUV',
  WST = 'WST',
  XAF = 'XAF',
  XAG = 'XAG',
  XAU = 'XAU',
  XCD = 'XCD',
  XDR = 'XDR',
  XOF = 'XOF',
  XPF = 'XPF',
  YER = 'YER',
  ZAR = 'ZAR',
  ZMK = 'ZMK',
  ZMW = 'ZMW',
  ZWL = 'ZWL',
}
export enum CurrencySymbolsLabelEnum {
  AED = 'AED - United Arab Emirates Dirham',
  AFN = 'AFN - Afghan Afghani',
  ALL = 'ALL - Albanian Lek',
  AMD = 'AMD - Armenian Dram',
  ANG = 'ANG - Netherlands Antillean Guilder',
  AOA = 'AOA - Angolan Kwanza',
  ARS = 'ARS - Argentine Peso',
  AUD = 'AUD - Australian Dollar',
  AWG = 'AWG - Aruban Florin',
  AZN = 'AZN - Azerbaijani Manat',
  BAM = 'BAM - Bosnia- Herzegovina Convertible Mark',
  BBD = 'BBD - Barbadian Dollar',
  BDT = 'BDT - Bangladeshi Taka',
  BGN = 'BGN - Bulgarian Lev',
  BHD = 'BHD - Bahraini Dinar',
  BIF = 'BIF - Burundian Franc',
  BMD = 'BMD - Bermudan Dollar',
  BND = 'BND - Brunei Dollar',
  BOB = 'BOB - Bolivian Boliviano',
  BRL = 'BRL - Brazilian Real',
  BSD = 'BSD - Bahamian Dollar',
  BTC = 'BTC - Bitcoin',
  BTN = 'BTN - Bhutanese Ngultrum',
  BWP = 'BWP - Botswanan Pula',
  BYN = 'BYN - New Belarusian Ruble',
  BYR = 'BYR - Belarusian Ruble',
  BZD = 'BZD - Belize Dollar',
  CAD = 'CAD - Canadian Dollar',
  CDF = 'CDF - Congolese Franc',
  CHF = 'CHF - Swiss Franc',
  CLF = 'CLF - Chilean Unit of Account (UF)',
  CLP = 'CLP - Chilean Peso',
  CNY = 'CNY - Chinese Yuan',
  COP = 'COP - Colombian Peso',
  CRC = 'CRC - Costa Rican Colón',
  CUC = 'CUC - Cuban Convertible Peso',
  CUP = 'CUP - Cuban Peso',
  CVE = 'CVE - Cape Verdean Escudo',
  CZK = 'CZK - Czech Republic Koruna',
  DJF = 'DJF - Djiboutian Franc',
  DKK = 'DKK - Danish Krone',
  DOP = 'DOP - Dominican Peso',
  DZD = 'DZD - Algerian Dinar',
  EGP = 'EGP - Egyptian Pound',
  ERN = 'ERN - Eritrean Nakfa',
  ETB = 'ETB - Ethiopian Birr',
  EUR = 'EUR - Euro',
  FJD = 'FJD - Fijian Dollar',
  FKP = 'FKP - Falkland Islands Pound',
  GBP = 'GBP - British Pound Sterling',
  GEL = 'GEL - Georgian Lari',
  GGP = 'GGP - Guernsey Pound',
  GHS = 'GHS - Ghanaian Cedi',
  GIP = 'GIP - Gibraltar Pound',
  GMD = 'GMD - Gambian Dalasi',
  GNF = 'GNF - Guinean Franc',
  GTQ = 'GTQ - Guatemalan Quetzal',
  GYD = 'GYD - Guyanaese Dollar',
  HKD = 'HKD - Hong Kong Dollar',
  HNL = 'HNL - Honduran Lempira',
  HRK = 'HRK - Croatian Kuna',
  HTG = 'HTG - Haitian Gourde',
  HUF = 'HUF - Hungarian Forint',
  IDR = 'IDR - Indonesian Rupiah',
  ILS = 'ILS - Israeli New Sheqel',
  IMP = 'IMP - Manx pound',
  INR = 'INR - Indian Rupee',
  IQD = 'IQD - Iraqi Dinar',
  IRR = 'IRR - Iranian Rial',
  ISK = 'ISK - Icelandic Króna',
  JEP = 'JEP - Jersey Pound',
  JMD = 'JMD - Jamaican Dollar',
  JOD = 'JOD - Jordanian Dinar',
  JPY = 'JPY - Japanese Yen',
  KES = 'KES - Kenyan Shilling',
  KGS = 'KGS - Kyrgystani Som',
  KHR = 'KHR - Cambodian Riel',
  KMF = 'KMF - Comorian Franc',
  KPW = 'KPW - North Korean Won',
  KRW = 'KRW - South Korean Won',
  KWD = 'KWD - Kuwaiti Dinar',
  KYD = 'KYD - Cayman Islands Dollar',
  KZT = 'KZT - Kazakhstani Tenge',
  LAK = 'LAK - Laotian Kip',
  LBP = 'LBP - Lebanese Pound',
  LKR = 'LKR - Sri Lankan Rupee',
  LRD = 'LRD - Liberian Dollar',
  LSL = 'LSL - Lesotho Loti',
  LTL = 'LTL - Lithuanian Litas',
  LVL = 'LVL - Latvian Lats',
  LYD = 'LYD - Libyan Dinar',
  MAD = 'MAD - Moroccan Dirham',
  MDL = 'MDL - Moldovan Leu',
  MGA = 'MGA - Malagasy Ariary',
  MKD = 'MKD - Macedonian Denar',
  MMK = 'MMK - Myanma Kyat',
  MNT = 'MNT - Mongolian Tugrik',
  MOP = 'MOP - Macanese Pataca',
  MRO = 'MRO - Mauritanian Ouguiya',
  MUR = 'MUR - Mauritian Rupee',
  MVR = 'MVR - Maldivian Rufiyaa',
  MWK = 'MWK - Malawian Kwacha',
  MXN = 'MXN - Mexican Peso',
  MYR = 'MYR - Malaysian Ringgit',
  MZN = 'MZN - Mozambican Metical',
  NAD = 'NAD - Namibian Dollar',
  NGN = 'NGN - Nigerian Naira',
  NIO = 'NIO - Nicaraguan Córdoba',
  NOK = 'NOK - Norwegian Krone',
  NPR = 'NPR - Nepalese Rupee',
  NZD = 'NZD - New Zealand Dollar',
  OMR = 'OMR - Omani Rial',
  PAB = 'PAB - Panamanian Balboa',
  PEN = 'PEN - Peruvian Nuevo Sol',
  PGK = 'PGK - Papua New Guinean Kina',
  PHP = 'PHP - Philippine Peso',
  PKR = 'PKR - Pakistani Rupee',
  PLN = 'PLN - Polish Zloty',
  PYG = 'PYG - Paraguayan Guarani',
  QAR = 'QAR - Qatari Rial',
  RON = 'RON - Romanian Leu',
  RSD = 'RSD - Serbian Dinar',
  RUB = 'RUB - Russian Ruble',
  RWF = 'RWF - Rwandan Franc',
  SAR = 'SAR - Saudi Riyal',
  SBD = 'SBD - Solomon Islands Dollar',
  SCR = 'SCR - Seychellois Rupee',
  SDG = 'SDG - Sudanese Pound',
  SEK = 'SEK - Swedish Krona',
  SGD = 'SGD - Singapore Dollar',
  SHP = 'SHP - Saint Helena Pound',
  SLL = 'SLL - Sierra Leonean Leone',
  SOS = 'SOS - Somali Shilling',
  SRD = 'SRD - Surinamese Dollar',
  STD = 'STD - São Tomé and Príncipe Dobra',
  SVC = 'SVC - Salvadoran Colón',
  SYP = 'SYP - Syrian Pound',
  SZL = 'SZL - Swazi Lilangeni',
  THB = 'THB - Thai Baht',
  TJS = 'TJS - Tajikistani Somoni',
  TMT = 'TMT - Turkmenistani Manat',
  TND = 'TND - Tunisian Dinar',
  TOP = 'TOP - Tongan Paʻanga',
  TRY = 'TRY - Turkish Lira',
  TTD = 'TTD - Trinidad and Tobago Dollar',
  TWD = 'TWD - New Taiwan Dollar',
  TZS = 'TZS - Tanzanian Shilling',
  UAH = 'UAH - Ukrainian Hryvnia',
  UGX = 'UGX - Ugandan Shilling',
  USD = 'USD - United States Dollar',
  UYU = 'UYU - Uruguayan Peso',
  UZS = 'UZS - Uzbekistan Som',
  VEF = 'VEF - Venezuelan Bolívar Fuerte',
  VND = 'VND - Vietnamese Dong',
  VUV = 'VUV - Vanuatu Vatu',
  WST = 'WST - Samoan Tala',
  XAF = 'XAF - CFA Franc BEAC',
  XAG = 'XAG - Silver (troy ounce)',
  XAU = 'XAU - Gold (troy ounce)',
  XCD = 'XCD - East Caribbean Dollar',
  XDR = 'XDR - Special Drawing Rights',
  XOF = 'XOF - CFA Franc BCEAO',
  XPF = 'XPF - CFP Franc',
  YER = 'YER - Yemeni Rial',
  ZAR = 'ZAR - South African Rand',
  ZMK = 'ZMK - Zambian Kwacha (pre- 2013)',
  ZMW = 'ZMW - Zambian Kwacha',
  ZWL = 'ZWL - Zimbabwean Dollar',
}
export enum OverwriteTypesEnum {
  PROPERTY = 'PROPERTY',
  FIELD = 'FIELD',
  KPI = 'KPI',
  PAYMENT = 'PAYMENT',
}
