/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/light");

var $root = ($protobuf.roots["default"] || ($protobuf.roots["default"] = new $protobuf.Root()))
.addJSON({
  pb: {
    nested: {
      ActivityReq: {
        fields: {
          id: {
            type: "int32",
            id: 1
          }
        }
      },
      ActivityList: {
        fields: {
          id: {
            type: "int64",
            id: 5
          },
          title: {
            type: "string",
            id: 1
          },
          content: {
            type: "string",
            id: 2
          },
          wapImg: {
            type: "string",
            id: 3
          },
          status: {
            type: "int32",
            id: 4
          }
        }
      },
      ActivityListResp: {
        fields: {
          activityList: {
            rule: "repeated",
            type: "ActivityList",
            id: 1
          }
        }
      },
      ActivityReceiveResp: {
        fields: {
          beginTime: {
            type: "int64",
            id: 1
          },
          endTime: {
            type: "int64",
            id: 2
          },
          rewardMoney: {
            type: "int64",
            id: 3
          },
          againBet: {
            type: "int64",
            id: 4
          },
          againMoney: {
            type: "int64",
            id: 5
          }
        }
      },
      PromotionApplyReq: {
        fields: {
          activityId: {
            type: "int64",
            id: 1
          },
          depositMoney: {
            type: "double",
            id: 2
          },
          remark: {
            type: "string",
            id: 3
          },
          code: {
            type: "string",
            id: 4
          },
          codeId: {
            type: "string",
            id: 5
          }
        }
      },
      PromotionList: {
        fields: {
          id: {
            type: "int64",
            id: 5
          },
          proTitle: {
            type: "string",
            id: 1
          },
          proContent: {
            type: "string",
            id: 2
          },
          wapImg: {
            type: "string",
            id: 3
          },
          status: {
            type: "int32",
            id: 4
          }
        }
      },
      PromotionListResp: {
        fields: {
          promotionList: {
            rule: "repeated",
            type: "PromotionList",
            id: 1
          }
        }
      },
      PromotionRecord: {
        fields: {
          activityTitle: {
            type: "string",
            id: 1
          },
          createTime: {
            type: "int32",
            id: 2
          },
          depositMoney: {
            type: "double",
            id: 3
          },
          actualMoney: {
            type: "double",
            id: 4
          },
          status: {
            type: "int32",
            id: 5
          }
        }
      },
      PromotionRecordResp: {
        fields: {
          money: {
            type: "double",
            id: 1
          },
          promotionRecord: {
            rule: "repeated",
            type: "PromotionRecord",
            id: 2
          }
        }
      },
      BackWaterListResp: {
        fields: {
          orderId: {
            type: "string",
            id: 1
          },
          betall: {
            type: "double",
            id: 2
          },
          createTime: {
            type: "int64",
            id: 3
          },
          rebateWater: {
            type: "double",
            id: 4
          }
        }
      },
      BackWaterReq: {
        fields: {
          pageParams: {
            type: "PageParams",
            id: 1
          }
        }
      },
      BackWaterResp: {
        fields: {
          today: {
            type: "double",
            id: 1
          },
          week: {
            type: "double",
            id: 2
          },
          list: {
            rule: "repeated",
            type: "BackWaterListResp",
            id: 3
          },
          totalNum: {
            type: "int64",
            id: 4
          }
        }
      },
      BackWaterInfoResp: {
        fields: {
          betall: {
            type: "double",
            id: 1
          },
          allMoney: {
            type: "double",
            id: 2
          },
          status: {
            type: "int64",
            id: 3
          },
          list: {
            rule: "repeated",
            type: "PlatformInfoResp",
            id: 4
          }
        }
      },
      PlatformInfoResp: {
        fields: {
          platformName: {
            type: "string",
            id: 1
          },
          betall: {
            type: "double",
            id: 2
          },
          money: {
            type: "double",
            id: 3
          }
        }
      },
      GameBalance: {
        fields: {
          id: {
            type: "int64",
            id: 3
          },
          name: {
            type: "string",
            id: 1
          },
          balance: {
            type: "double",
            id: 2
          },
          platformName: {
            type: "string",
            id: 4
          }
        }
      },
      WalletCenterResp: {
        fields: {
          account: {
            type: "string",
            id: 1
          },
          balance: {
            type: "double",
            id: 2
          },
          gameTotalBalance: {
            type: "double",
            id: 3
          },
          gameBalance: {
            rule: "repeated",
            type: "GameBalance",
            id: 4
          }
        }
      },
      WalletInfoResp: {
        fields: {
          walletCenterResp: {
            type: "WalletCenterResp",
            id: 1
          },
          memberSwitchInfo: {
            type: "MemberSwitchInfo",
            id: 2
          }
        }
      },
      MemberOrderReq: {
        fields: {
          orderType: {
            type: "int32",
            id: 1
          },
          timeType: {
            type: "int32",
            id: 2
          },
          pageParams: {
            type: "PageParams",
            id: 3
          }
        }
      },
      MemberCompanyIncomeResp: {
        fields: {
          orderId: {
            type: "string",
            id: 1
          },
          bankName: {
            type: "string",
            id: 2
          },
          depositName: {
            type: "string",
            id: 3
          },
          depositAccount: {
            type: "string",
            id: 11
          },
          bankNum: {
            type: "string",
            id: 4
          },
          depositMoney: {
            type: "double",
            id: 5
          },
          depositDiscount: {
            type: "double",
            id: 6
          },
          otherDiscount: {
            type: "double",
            id: 7
          },
          depositTime: {
            type: "int64",
            id: 8
          },
          updateTime: {
            type: "int64",
            id: 9
          },
          status: {
            type: "int32",
            id: 10
          }
        }
      },
      MemberOnlineIncomeResp: {
        fields: {
          orderId: {
            type: "string",
            id: 1
          },
          depositInstitution: {
            type: "string",
            id: 2
          },
          amountDeposit: {
            type: "double",
            id: 3
          },
          depositDiscount: {
            type: "double",
            id: 4
          },
          otherDepositDiscount: {
            type: "double",
            id: 5
          },
          thirdPayTime: {
            type: "int64",
            id: 6
          },
          status: {
            type: "int32",
            id: 7
          }
        }
      },
      MemberOutRecordResp: {
        fields: {
          orderId: {
            type: "string",
            id: 1
          },
          doMoney: {
            type: "double",
            id: 2
          },
          feeMoney: {
            type: "double",
            id: 3
          },
          outwardMoney: {
            type: "double",
            id: 4
          },
          createTime: {
            type: "int64",
            id: 5
          },
          status: {
            type: "int32",
            id: 6
          }
        }
      },
      MemberConversionResp: {
        fields: {
          memberConversion: {
            type: "string",
            id: 1
          },
          doType: {
            type: "int32",
            id: 2
          },
          doMoney: {
            type: "double",
            id: 3
          },
          createTime: {
            type: "int64",
            id: 4
          },
          orderId: {
            type: "string",
            id: 5
          }
        }
      },
      MemberOrderResp: {
        fields: {
          memberCompanyIncomeResp: {
            rule: "repeated",
            type: "MemberCompanyIncomeResp",
            id: 1
          },
          memberOnlineIncomeResp: {
            rule: "repeated",
            type: "MemberOnlineIncomeResp",
            id: 2
          },
          memberOutRecordResp: {
            rule: "repeated",
            type: "MemberOutRecordResp",
            id: 3
          },
          memberConversionResp: {
            rule: "repeated",
            type: "MemberConversionResp",
            id: 4
          },
          totalNum: {
            type: "int64",
            id: 5
          }
        }
      },
      MemberCashRecordReq: {
        fields: {
          operateType: {
            type: "int32",
            id: 1
          },
          timeType: {
            type: "int32",
            id: 2
          },
          pageParams: {
            type: "PageParams",
            id: 3
          }
        }
      },
      MemberCashRecord: {
        fields: {
          sourceType: {
            type: "int32",
            id: 1
          },
          doType: {
            type: "int32",
            id: 2
          },
          doMoney: {
            type: "double",
            id: 3
          },
          disMoney: {
            type: "double",
            id: 4
          },
          balance: {
            type: "double",
            id: 5
          },
          createTime: {
            type: "int64",
            id: 6
          },
          orderId: {
            type: "string",
            id: 7
          }
        }
      },
      MemberCashRecordResp: {
        fields: {
          memberCashRecord: {
            rule: "repeated",
            type: "MemberCashRecord",
            id: 1
          },
          totalNum: {
            type: "int64",
            id: 2
          }
        }
      },
      MemberConversionReq: {
        fields: {
          doType: {
            type: "int32",
            id: 1
          },
          money: {
            type: "int64",
            id: 2
          },
          platformId: {
            type: "int64",
            id: 3
          },
          platformName: {
            type: "string",
            id: 4
          }
        }
      },
      AutoConversionReq: {
        fields: {
          dayFirst: {
            type: "int32",
            id: 1
          },
          balanceRatio: {
            type: "int32",
            id: 2
          }
        }
      },
      AutoConversionResp: {
        fields: {
          dayFirst: {
            type: "int32",
            id: 1
          },
          balanceRatio: {
            type: "int32",
            id: 2
          }
        }
      },
      AutoMemberConversionReq: {
        fields: {
          platformId: {
            type: "int64",
            id: 1
          },
          platformName: {
            type: "string",
            id: 2
          }
        }
      },
      AutoMemberConversionResp: {
        fields: {
          remark: {
            type: "string",
            id: 1
          }
        }
      },
      BetReportInfoReq: {
        fields: {
          gameType: {
            type: "int32",
            id: 1
          },
          timeType: {
            type: "int32",
            id: 2
          },
          platform: {
            type: "string",
            id: 3
          },
          pageParams: {
            type: "PageParams",
            id: 4
          },
          gameName: {
            type: "string",
            id: 5
          }
        }
      },
      BetReportInfo: {
        fields: {
          betAll: {
            type: "double",
            id: 8
          },
          win: {
            type: "double",
            id: 7
          },
          orderId: {
            type: "string",
            id: 6
          },
          gameTranslatedName: {
            type: "string",
            id: 1
          },
          gameResult: {
            type: "string",
            id: 2
          },
          betDetail: {
            type: "string",
            id: 3
          },
          periodsOrTable: {
            type: "string",
            id: 4
          },
          retreatWater: {
            type: "string",
            id: 5
          },
          betTime: {
            type: "int64",
            id: 9
          },
          productName: {
            type: "string",
            id: 10
          }
        }
      },
      BetReportInfoResp: {
        fields: {
          BetReportInfo: {
            rule: "repeated",
            type: "BetReportInfo",
            id: 1
          },
          totalNum: {
            type: "int64",
            id: 2
          }
        }
      },
      BetReportAccountReq: {
        fields: {
          timeType: {
            type: "int32",
            id: 1
          }
        }
      },
      BetReportAccount: {
        fields: {
          betTime: {
            type: "int64",
            id: 1
          },
          weekday: {
            type: "string",
            id: 6
          },
          betNum: {
            type: "int64",
            id: 2
          },
          betAll: {
            type: "double",
            id: 3
          },
          betValid: {
            type: "double",
            id: 4
          },
          win: {
            type: "double",
            id: 5
          }
        }
      },
      BetReportAccountResp: {
        fields: {
          betReportAccount: {
            rule: "repeated",
            type: "BetReportAccount",
            id: 1
          },
          totalBetNum: {
            type: "int64",
            id: 2
          },
          totalBetAll: {
            type: "double",
            id: 3
          },
          totalBetValid: {
            type: "double",
            id: 4
          },
          totalWin: {
            type: "double",
            id: 5
          }
        }
      },
      BetTypeReq: {
        fields: {
          betType: {
            type: "int64",
            id: 1
          }
        }
      },
      BetTypeResp: {
        fields: {
          betType: {
            rule: "repeated",
            type: "BetType",
            id: 1
          }
        }
      },
      BetType: {
        fields: {
          name: {
            type: "string",
            id: 1
          },
          value: {
            type: "string",
            id: 2
          },
          topId: {
            type: "int64",
            id: 3
          }
        }
      },
      PageParams: {
        fields: {
          page: {
            type: "int64",
            id: 1
          },
          pageSize: {
            type: "int64",
            id: 2
          }
        }
      },
      TopIdRep: {
        fields: {
          id: {
            type: "int64",
            id: 1
          }
        }
      },
      LotteryTicketType: {
        fields: {
          id: {
            type: "int64",
            id: 1
          },
          fcName: {
            type: "string",
            id: 2
          },
          fcHref: {
            type: "string",
            id: 3
          }
        }
      },
      LotteryTicketTypeResp: {
        fields: {
          lotteryTicketType: {
            rule: "repeated",
            type: "LotteryTicketType",
            id: 1
          }
        }
      },
      MemberSwitchInfo: {
        fields: {
          isSpread: {
            type: "bool",
            id: 1
          },
          isWaterSelf: {
            type: "bool",
            id: 2
          },
          isOfferSelf: {
            type: "bool",
            id: 3
          },
          isAgencyReg: {
            type: "bool",
            id: 4
          }
        }
      },
      Captcha: {
        fields: {
          ID: {
            type: "string",
            id: 1
          },
          Code: {
            type: "string",
            id: 2
          }
        }
      },
      Contact: {
        fields: {
          content: {
            type: "string",
            id: 1
          },
          itype: {
            type: "int64",
            id: 2
          }
        }
      },
      ContactResp: {
        fields: {
          list: {
            rule: "repeated",
            type: "Contact",
            id: 1
          }
        }
      },
      FootIwordResp: {
        fields: {
          logo: {
            type: "string",
            id: 1
          },
          iword: {
            rule: "repeated",
            type: "FootIword",
            id: 2
          }
        }
      },
      FootIword: {
        fields: {
          title: {
            type: "string",
            id: 1
          },
          content: {
            type: "string",
            id: 2
          },
          id: {
            type: "int32",
            id: 3
          }
        }
      },
      IndexDataResp: {
        fields: {
          logoUrl: {
            type: "string",
            id: 1
          },
          flash: {
            rule: "repeated",
            type: "FrontSiteFlashResp",
            id: 2
          },
          red: {
            type: "RedPacketSetResp",
            id: 3
          },
          fullScreen: {
            type: "FullScreenResp",
            id: 4
          },
          adv: {
            rule: "repeated",
            type: "AdvResp",
            id: 5
          },
          notice: {
            rule: "repeated",
            type: "IndexNoticeResp",
            id: 6
          },
          gameInfo: {
            rule: "repeated",
            type: "GameTypeInfo",
            id: 7
          },
          hotGame: {
            rule: "repeated",
            type: "ProductInfo",
            id: 8
          },
          cdn: {
            type: "string",
            id: 9
          },
          title: {
            type: "string",
            id: 10
          }
        }
      },
      RecentGameResp: {
        fields: {
          game: {
            rule: "repeated",
            type: "ProductInfo",
            id: 1
          },
          cdn: {
            type: "string",
            id: 2
          }
        }
      },
      FrontSiteFlashResp: {
        fields: {
          id: {
            type: "int64",
            id: 1
          },
          imgTitle: {
            type: "string",
            id: 4
          },
          imgUrl: {
            type: "string",
            id: 5
          },
          linkUrl: {
            type: "string",
            id: 6
          },
          isLink: {
            type: "int64",
            id: 7
          },
          ftype: {
            type: "int64",
            id: 8
          },
          sort: {
            type: "int64",
            id: 9
          }
        }
      },
      RedPacketSetResp: {
        fields: {
          id: {
            type: "int64",
            id: 1
          },
          title: {
            type: "string",
            id: 2
          },
          description: {
            type: "string",
            id: 3
          },
          totalMoney: {
            type: "double",
            id: 4
          },
          bgPic: {
            type: "string",
            id: 5
          }
        }
      },
      FullScreenResp: {
        fields: {
          type: {
            type: "int64",
            id: 1
          },
          img: {
            rule: "repeated",
            type: "AgencyFullScreenAnimation",
            id: 2
          },
          h5: {
            type: "AgencyFullScreenAnimation",
            id: 3
          }
        }
      },
      AgencyFullScreenAnimation: {
        fields: {
          id: {
            type: "int64",
            id: 1
          },
          title: {
            type: "string",
            id: 2
          },
          startTime: {
            type: "int64",
            id: 3
          },
          endTime: {
            type: "int64",
            id: 4
          },
          img: {
            type: "string",
            id: 5
          },
          linkType: {
            type: "int64",
            id: 6
          },
          linkUrl: {
            type: "string",
            id: 7
          },
          h5File: {
            type: "string",
            id: 8
          },
          h5Url: {
            type: "string",
            id: 9
          }
        }
      },
      AdvResp: {
        fields: {
          title: {
            type: "string",
            id: 1
          },
          content: {
            type: "string",
            id: 2
          },
          beginTime: {
            type: "int64",
            id: 3
          },
          endTime: {
            type: "int64",
            id: 4
          },
          advUrl: {
            type: "string",
            id: 5
          },
          isLink: {
            type: "int64",
            id: 6
          },
          remark: {
            type: "string",
            id: 7
          },
          sort: {
            type: "int64",
            id: 8
          }
        }
      },
      QueryNoticeReq: {
        fields: {
          position: {
            type: "int64",
            id: 1
          },
          cate: {
            type: "int64",
            id: 2
          },
          isGame: {
            type: "int64",
            id: 3
          }
        }
      },
      SiteInfoData: {
        fields: {
          logoUrl: {
            type: "string",
            id: 1
          },
          flash: {
            rule: "repeated",
            type: "FrontSiteFlashResp",
            id: 2
          },
          red: {
            type: "RedPacketSetResp",
            id: 3
          },
          fullScreen: {
            type: "FullScreenResp",
            id: 4
          },
          adv: {
            rule: "repeated",
            type: "AdvResp",
            id: 5
          }
        }
      },
      IndexNoticeResp: {
        fields: {
          id: {
            type: "int64",
            id: 1
          },
          title: {
            type: "string",
            id: 2
          },
          content: {
            type: "string",
            id: 3
          },
          createTime: {
            type: "int64",
            id: 4
          }
        }
      },
      NoticeResp: {
        fields: {
          notice: {
            rule: "repeated",
            type: "IndexNoticeResp",
            id: 1
          }
        }
      },
      GameFc: {
        fields: {
          id: {
            type: "int64",
            id: 1
          },
          fcName: {
            type: "string",
            id: 2
          },
          fcType: {
            type: "string",
            id: 3
          },
          fcLxType: {
            type: "string",
            id: 4
          },
          fcHref: {
            type: "string",
            id: 5
          },
          fcSort: {
            type: "int64",
            id: 6
          },
          hot: {
            type: "int64",
            id: 7
          },
          topId: {
            type: "int64",
            id: 8
          },
          status: {
            type: "int64",
            id: 9
          },
          iconUrl: {
            type: "string",
            id: 10
          }
        }
      },
      GameDz: {
        fields: {
          topid: {
            type: "int64",
            id: 1
          },
          itemid: {
            type: "int64",
            id: 2
          },
          gameid: {
            type: "string",
            id: 3
          },
          name: {
            type: "string",
            id: 4
          },
          image: {
            type: "string",
            id: 5
          },
          status: {
            type: "int64",
            id: 6
          },
          recommend: {
            type: "int64",
            id: 7
          },
          isSw: {
            type: "int64",
            id: 8
          },
          isZs: {
            type: "int64",
            id: 9
          },
          parentId: {
            type: "int64",
            id: 10
          },
          device: {
            type: "int64",
            id: 11
          }
        }
      },
      GameProduct: {
        fields: {
          id: {
            type: "int64",
            id: 1
          },
          productName: {
            type: "string",
            id: 2
          },
          typeId: {
            type: "int64",
            id: 3
          },
          platformId: {
            type: "int64",
            id: 4
          },
          sort: {
            type: "int64",
            id: 5
          },
          platformName: {
            type: "string",
            id: 6
          },
          typeName: {
            type: "string",
            id: 7
          },
          iconUrl: {
            type: "string",
            id: 8
          }
        }
      },
      GameInfo: {
        fields: {
          platformId: {
            type: "int64",
            id: 1
          },
          platformName: {
            type: "string",
            id: 2
          },
          typeId: {
            type: "int64",
            id: 3
          },
          typeName: {
            type: "string",
            id: 4
          },
          content: {
            type: "string",
            id: 5
          },
          isWh: {
            type: "int64",
            id: 6
          },
          productList: {
            rule: "repeated",
            type: "GameProduct",
            id: 7
          },
          eGame: {
            rule: "repeated",
            type: "GameDz",
            id: 8
          },
          fcGame: {
            rule: "repeated",
            type: "GameFc",
            id: 9
          },
          iconUrl: {
            type: "string",
            id: 10
          }
        }
      },
      GameTypeInfo: {
        fields: {
          id: {
            type: "int64",
            id: 1
          },
          title: {
            type: "string",
            id: 2
          },
          status: {
            type: "int64",
            id: 3
          },
          sort: {
            type: "int64",
            id: 4
          },
          platformNameList: {
            rule: "repeated",
            type: "GameInfo",
            id: 5
          }
        }
      },
      ProductInfo: {
        fields: {
          id: {
            type: "int64",
            id: 1
          },
          productName: {
            type: "string",
            id: 2
          },
          typeId: {
            type: "int64",
            id: 3
          },
          platformId: {
            type: "int64",
            id: 4
          },
          platformName: {
            type: "string",
            id: 5
          },
          sort: {
            type: "int64",
            id: 6
          },
          iconUrl: {
            type: "string",
            id: 7
          }
        }
      },
      SiteContactResp: {
        fields: {
          siteContact: {
            rule: "repeated",
            type: "SiteContact",
            id: 1
          }
        }
      },
      SiteContact: {
        fields: {
          itype: {
            type: "int64",
            id: 1
          },
          content: {
            type: "string",
            id: 2
          }
        }
      },
      MemberPlayReq: {
        fields: {
          platform: {
            type: "string",
            id: 1
          },
          gameId: {
            type: "string",
            id: 2
          }
        }
      },
      MemberPlayResp: {
        fields: {
          loginUrl: {
            type: "string",
            id: 1
          }
        }
      },
      RedPacketReceiveReq: {
        fields: {
          setId: {
            type: "int32",
            id: 1
          }
        }
      },
      RedPacketReceiveResp: {
        fields: {
          id: {
            type: "int32",
            id: 1
          },
          orderId: {
            type: "string",
            id: 2
          },
          setId: {
            type: "int32",
            id: 3
          },
          money: {
            type: "double",
            id: 4
          },
          updateTime: {
            type: "int32",
            id: 5
          },
          inStartTime: {
            type: "int32",
            id: 6
          },
          inEndTime: {
            type: "int32",
            id: 7
          },
          inSum: {
            type: "double",
            id: 8
          },
          auditStartTime: {
            type: "int32",
            id: 9
          },
          auditEndTime: {
            type: "int32",
            id: 10
          },
          betSum: {
            type: "double",
            id: 11
          },
          startTime: {
            type: "int32",
            id: 12
          },
          endTime: {
            type: "int32",
            id: 13
          },
          returnType: {
            type: "int32",
            id: 14
          }
        }
      },
      Maintain: {
        fields: {
          msg: {
            type: "string",
            id: 1
          }
        }
      },
      CompanyBank: {
        fields: {
          id: {
            type: "int64",
            id: 1
          },
          payType: {
            type: "int64",
            id: 2
          },
          bankId: {
            type: "int64",
            id: 3
          },
          bankName: {
            type: "string",
            id: 4
          },
          bankNum: {
            type: "string",
            id: 5
          },
          bankAddress: {
            type: "string",
            id: 6
          },
          bankUser: {
            type: "string",
            id: 7
          },
          stopBalance: {
            type: "double",
            id: 8
          },
          overBalance: {
            type: "double",
            id: 9
          },
          payImg: {
            type: "string",
            id: 10
          },
          isHigh: {
            type: "int64",
            id: 11
          },
          remark: {
            type: "string",
            id: 12
          },
          lineDepositMax: {
            type: "double",
            id: 13
          },
          lineDepositMin: {
            type: "double",
            id: 14
          }
        }
      },
      OnlineSetResp: {
        fields: {
          pay: {
            rule: "repeated",
            type: "OnlinePayList",
            id: 1
          }
        }
      },
      IncomeBankListResp: {
        fields: {
          pay: {
            rule: "repeated",
            type: "OnlinePayItem",
            id: 1
          },
          bank: {
            rule: "repeated",
            type: "CompanyBank",
            id: 2
          }
        }
      },
      OnlineSet: {
        fields: {
          id: {
            type: "int64",
            id: 1
          },
          payId: {
            type: "int64",
            id: 2
          },
          payIdName: {
            type: "string",
            id: 3
          },
          payType: {
            type: "string",
            id: 4
          },
          payTypeName: {
            type: "string",
            id: 5
          },
          isApp: {
            type: "int64",
            id: 6
          },
          businessNum: {
            type: "string",
            id: 7
          },
          singleMin: {
            type: "double",
            id: 8
          },
          singleMax: {
            type: "double",
            id: 9
          },
          isQuick: {
            type: "int64",
            id: 10
          },
          merId: {
            type: "string",
            id: 11
          },
          PayCode: {
            type: "string",
            id: 12
          },
          dayMax: {
            type: "double",
            id: 13
          },
          totalMax: {
            type: "double",
            id: 14
          }
        }
      },
      PayBankResp: {
        fields: {
          bank: {
            rule: "repeated",
            type: "PayBank",
            id: 1
          }
        }
      },
      PayBank: {
        fields: {
          payId: {
            type: "int64",
            id: 1
          },
          bankName: {
            type: "string",
            id: 2
          },
          bankCode: {
            type: "string",
            id: 3
          }
        }
      },
      PayPointCard: {
        fields: {
          payId: {
            type: "int64",
            id: 1
          },
          pointCardName: {
            type: "string",
            id: 2
          },
          pointCardCode: {
            type: "string",
            id: 3
          }
        }
      },
      PayPointCardResp: {
        fields: {
          payPointCard: {
            rule: "repeated",
            type: "PayPointCard",
            id: 1
          }
        }
      },
      OrderResp: {
        fields: {
          order: {
            type: "string",
            id: 1
          }
        }
      },
      OrderReq: {
        fields: {
          order: {
            type: "string",
            id: 1
          },
          incomeType: {
            type: "int32",
            id: 2
          }
        }
      },
      IncomeSuccessResp: {
        fields: {
          order: {
            type: "string",
            id: 1
          },
          bankName: {
            type: "string",
            id: 2
          },
          incomeUser: {
            type: "string",
            id: 3
          },
          incomeMoney: {
            type: "double",
            id: 4
          },
          depositDiscount: {
            type: "double",
            id: 5
          },
          otherDiscount: {
            type: "double",
            id: 6
          }
        }
      },
      AgencyAdv: {
        fields: {
          advId: {
            type: "int64",
            id: 1
          },
          content: {
            type: "string",
            id: 2
          },
          advUrl: {
            type: "string",
            id: 3
          },
          isLink: {
            type: "int32",
            id: 4
          }
        }
      },
      AdvReq: {
        fields: {
          advType: {
            type: "int32",
            id: 1
          }
        }
      },
      AdvGameResp: {
        fields: {
          hotGame: {
            rule: "repeated",
            type: "ProductInfo",
            id: 1
          },
          adv: {
            rule: "repeated",
            type: "AgencyAdv",
            id: 2
          },
          cdn: {
            type: "string",
            id: 3
          }
        }
      },
      BankListReq: {
        fields: {
          payId: {
            type: "string",
            id: 1
          }
        }
      },
      SiteMemberCompanyIncomeFrontAdd: {
        fields: {
          setId: {
            type: "int64",
            id: 1
          },
          depositAccount: {
            type: "string",
            id: 2
          },
          depositMoney: {
            type: "double",
            id: 3
          },
          remark: {
            type: "string",
            id: 4
          },
          depositTime: {
            type: "int64",
            id: 5
          },
          orderCode: {
            type: "int64",
            id: 6
          }
        }
      },
      SiteMemberOnlineFront: {
        fields: {
          depositMoney: {
            type: "double",
            id: 1
          },
          paidType: {
            type: "int64",
            id: 2
          },
          isFast: {
            type: "int64",
            id: 3
          },
          setId: {
            type: "int64",
            id: 4
          },
          remark: {
            type: "string",
            id: 5
          }
        }
      },
      BuyReq: {
        fields: {
          order: {
            type: "string",
            id: 1
          },
          amount: {
            type: "string",
            id: 2
          },
          payway: {
            type: "int64",
            id: 3
          },
          payType: {
            type: "int64",
            id: 4
          },
          merId: {
            type: "int64",
            id: 5
          },
          businessnum: {
            type: "string",
            id: 6
          },
          bank: {
            type: "string",
            id: 7
          },
          isapp: {
            type: "int64",
            id: 8
          },
          cardmoney: {
            type: "string",
            id: 9
          },
          cardnumber: {
            type: "string",
            id: 10
          },
          cardPwd: {
            type: "string",
            id: 11
          }
        }
      },
      FormResp: {
        fields: {
          url: {
            type: "string",
            id: 1
          }
        }
      },
      OnlinePayList: {
        fields: {
          list: {
            rule: "repeated",
            type: "OnlinePayItem",
            id: 1
          }
        }
      },
      OnlinePayItem: {
        fields: {
          businessNum: {
            type: "string",
            id: 1
          },
          merId: {
            type: "int64",
            id: 2
          },
          payId: {
            type: "int64",
            id: 3
          },
          payType: {
            type: "int64",
            id: 4
          },
          payName: {
            type: "string",
            id: 5
          },
          setId: {
            type: "int64",
            id: 6
          },
          singleMax: {
            type: "double",
            id: 7
          },
          singleMin: {
            type: "double",
            id: 8
          },
          payIdName: {
            type: "string",
            id: 9
          },
          isApp: {
            type: "int64",
            id: 10
          },
          isQuick: {
            type: "int64",
            id: 11
          },
          PayCode: {
            type: "string",
            id: 12
          },
          dayMax: {
            type: "double",
            id: 13
          },
          totalMax: {
            type: "double",
            id: 14
          }
        }
      },
      CompanyIncomeInfoResp: {
        fields: {
          id: {
            type: "int64",
            id: 1
          },
          payType: {
            type: "int64",
            id: 2
          },
          bankName: {
            type: "string",
            id: 3
          },
          bankNum: {
            type: "string",
            id: 4
          },
          bankUser: {
            type: "string",
            id: 5
          },
          payImg: {
            type: "string",
            id: 6
          },
          lineDepositMax: {
            type: "double",
            id: 7
          },
          lineDepositMin: {
            type: "double",
            id: 8
          }
        }
      },
      OnlineIncomeInfoReq: {
        fields: {
          payType: {
            type: "int64",
            id: 1
          },
          setId: {
            type: "int64",
            id: 2
          }
        }
      },
      OnlineIncomeInfoResp: {
        fields: {
          businessNum: {
            type: "string",
            id: 1
          },
          merId: {
            type: "int64",
            id: 2
          },
          payId: {
            type: "int64",
            id: 3
          },
          payType: {
            type: "int64",
            id: 4
          },
          payName: {
            type: "string",
            id: 5
          },
          setId: {
            type: "int64",
            id: 6
          },
          singleMax: {
            type: "double",
            id: 7
          },
          singleMin: {
            type: "double",
            id: 8
          },
          balance: {
            type: "double",
            id: 9
          }
        }
      },
      Myself: {
        fields: {
          account: {
            type: "string",
            id: 1
          },
          balance: {
            type: "double",
            id: 2
          }
        }
      },
      Member: {
        fields: {
          account: {
            type: "string",
            id: 1
          },
          nickname: {
            type: "string",
            id: 2
          },
          country: {
            type: "string",
            id: 3
          },
          province: {
            type: "string",
            id: 4
          },
          city: {
            type: "string",
            id: 5
          },
          loginLastTime: {
            type: "int64",
            id: 6
          }
        }
      },
      MemberInfo: {
        fields: {
          realName: {
            type: "string",
            id: 1
          },
          idCard: {
            type: "string",
            id: 2
          },
          mobile: {
            type: "string",
            id: 3
          },
          email: {
            type: "string",
            id: 4
          },
          qq: {
            type: "string",
            id: 5
          },
          wechat: {
            type: "string",
            id: 6
          },
          birthday: {
            type: "string",
            id: 7
          }
        }
      },
      MemberCenter: {
        fields: {
          info: {
            type: "Myself",
            id: 1
          },
          "switch": {
            type: "MemberSwitchInfo",
            id: 2
          },
          unread: {
            type: "UnReadResp",
            id: 3
          }
        }
      },
      MemberInfoResp: {
        fields: {
          member: {
            type: "Member",
            id: 1
          },
          memberInfo: {
            type: "MemberInfo",
            id: 2
          }
        }
      },
      MemberUpdateRep: {
        fields: {
          nickname: {
            type: "string",
            id: 1
          },
          idCard: {
            type: "string",
            id: 2
          },
          mobile: {
            type: "string",
            id: 3
          },
          email: {
            type: "string",
            id: 4
          },
          qq: {
            type: "string",
            id: 5
          },
          wechat: {
            type: "string",
            id: 6
          },
          birthday: {
            type: "string",
            id: 7
          },
          country: {
            type: "string",
            id: 8
          },
          province: {
            type: "string",
            id: 9
          },
          city: {
            type: "string",
            id: 10
          }
        }
      },
      EidtMemberPasswordReq: {
        fields: {
          passType: {
            type: "int32",
            id: 1
          },
          password: {
            type: "string",
            id: 2
          },
          newPass: {
            type: "string",
            id: 3
          },
          confirmPass: {
            type: "string",
            id: 4
          }
        }
      },
      MemberBankList: {
        fields: {
          id: {
            type: "int64",
            id: 1
          },
          bankId: {
            type: "int64",
            id: 7
          },
          bankName: {
            type: "string",
            id: 2
          },
          card: {
            type: "string",
            id: 3
          },
          username: {
            type: "string",
            id: 4
          },
          isDefault: {
            type: "int32",
            id: 5
          },
          subbranch: {
            type: "string",
            id: 6
          }
        }
      },
      MemberBankListResp: {
        fields: {
          memberBankList: {
            rule: "repeated",
            type: "MemberBankList",
            id: 1
          }
        }
      },
      BankCardDrop: {
        fields: {
          id: {
            type: "int64",
            id: 1
          },
          title: {
            type: "string",
            id: 2
          }
        }
      },
      BankCardDropResp: {
        fields: {
          bankCardDrop: {
            rule: "repeated",
            type: "BankCardDrop",
            id: 1
          }
        }
      },
      IsHasUsernameResp: {
        fields: {
          username: {
            type: "string",
            id: 1
          }
        }
      },
      AddMemberBankCardReq: {
        fields: {
          bankId: {
            type: "int64",
            id: 1
          },
          card: {
            type: "string",
            id: 2
          },
          subbranch: {
            type: "string",
            id: 3
          },
          username: {
            type: "string",
            id: 4
          }
        }
      },
      MemberIdReq: {
        fields: {
          id: {
            type: "int64",
            id: 1
          }
        }
      },
      UnReadResp: {
        fields: {
          count: {
            type: "int32",
            id: 1
          }
        }
      },
      MessageList: {
        fields: {
          id: {
            type: "int64",
            id: 1
          },
          title: {
            type: "string",
            id: 2
          },
          content: {
            type: "string",
            id: 3
          },
          createTime: {
            type: "int64",
            id: 4
          }
        }
      },
      NoticeListResp: {
        fields: {
          messageList: {
            rule: "repeated",
            type: "MessageList",
            id: 1
          },
          totalNum: {
            type: "int64",
            id: 2
          }
        }
      },
      MessageListResp: {
        fields: {
          messageList: {
            rule: "repeated",
            type: "ReadMessage",
            id: 1
          },
          unReadNum: {
            type: "int32",
            id: 2
          },
          totalNum: {
            type: "int32",
            id: 3
          }
        }
      },
      MessageIdReq: {
        fields: {
          id: {
            type: "int32",
            id: 1
          }
        }
      },
      ReadMessage: {
        fields: {
          id: {
            type: "int32",
            id: 1
          },
          title: {
            type: "string",
            id: 2
          },
          content: {
            type: "string",
            id: 3
          },
          mType: {
            type: "int32",
            id: 4
          },
          createTime: {
            type: "int32",
            id: 5
          },
          status: {
            type: "int32",
            id: 6
          }
        }
      },
      MemberRegisterReq: {
        fields: {
          account: {
            type: "string",
            id: 1
          },
          password: {
            type: "string",
            id: 2
          },
          confirmPassword: {
            type: "string",
            id: 3
          },
          spreadId: {
            type: "string",
            id: 4
          },
          code: {
            type: "string",
            id: 6
          },
          readAgree: {
            type: "bool",
            id: 8
          },
          codeId: {
            type: "string",
            id: 9
          }
        }
      },
      MemberLoginReq: {
        fields: {
          account: {
            type: "string",
            id: 1
          },
          password: {
            type: "string",
            id: 2
          },
          code: {
            type: "string",
            id: 3
          },
          codeId: {
            type: "string",
            id: 4
          }
        }
      },
      SessionResp: {
        fields: {
          sessionId: {
            type: "string",
            id: 1
          }
        }
      },
      RegProtocolResp: {
        fields: {
          id: {
            type: "int64",
            id: 1
          },
          title: {
            type: "string",
            id: 2
          },
          content: {
            type: "string",
            id: 3
          }
        }
      },
      BankListResp: {
        fields: {
          bank: {
            rule: "repeated",
            type: "BankList",
            id: 1
          }
        }
      },
      BankList: {
        fields: {
          id: {
            type: "int64",
            id: 1
          },
          title: {
            type: "string",
            id: 2
          }
        }
      },
      ApplyInfo: {
        fields: {
          setting: {
            type: "ApplySettingResp",
            id: 1
          },
          bank: {
            type: "BankListResp",
            id: 2
          }
        }
      },
      ApplySettingResp: {
        fields: {
          isOpen: {
            type: "int64",
            id: 1
          },
          chineseNickName: {
            type: "int64",
            id: 2
          },
          englishNickName: {
            type: "int64",
            id: 3
          },
          telephone: {
            type: "int64",
            id: 4
          },
          email: {
            type: "int64",
            id: 5
          },
          qq: {
            type: "int64",
            id: 6
          },
          wechat: {
            type: "int64",
            id: 7
          },
          remark: {
            type: "int64",
            id: 8
          },
          promoteSite: {
            type: "int64",
            id: 9
          },
          otherPromoteWay: {
            type: "int64",
            id: 10
          }
        }
      },
      ProxyApplyReq: {
        fields: {
          chineseNickName: {
            type: "string",
            id: 1
          },
          englishNickName: {
            type: "string",
            id: 2
          },
          telephone: {
            type: "string",
            id: 3
          },
          email: {
            type: "string",
            id: 4
          },
          qq: {
            type: "string",
            id: 5
          },
          wechat: {
            type: "string",
            id: 6
          },
          promoteSite: {
            type: "string",
            id: 7
          },
          otherPromoteWay: {
            type: "string",
            id: 8
          },
          remark: {
            type: "string",
            id: 9
          },
          account: {
            type: "string",
            id: 10
          },
          password: {
            type: "string",
            id: 11
          },
          rePassword: {
            type: "string",
            id: 12
          },
          idCard: {
            type: "string",
            id: 13
          },
          realName: {
            type: "string",
            id: 14
          },
          code: {
            type: "string",
            id: 15
          },
          codeId: {
            type: "string",
            id: 16
          },
          bankName: {
            type: "string",
            id: 17
          },
          bankNum: {
            type: "string",
            id: 18
          },
          province: {
            type: "string",
            id: 19
          },
          city: {
            type: "string",
            id: 20
          }
        }
      },
      RebateList: {
        fields: {
          validBet: {
            type: "double",
            id: 1
          },
          rebate: {
            type: "double",
            id: 2
          },
          createTime: {
            type: "int64",
            id: 3
          }
        }
      },
      RebateListResp: {
        fields: {
          spreadNum: {
            type: "int64",
            id: 1
          },
          spreadMoney: {
            type: "double",
            id: 2
          },
          list: {
            rule: "repeated",
            type: "RebateList",
            id: 3
          },
          totalNum: {
            type: "int64",
            id: 4
          },
          protion: {
            rule: "repeated",
            type: "ProportionResp",
            id: 5
          }
        }
      },
      ProportionResp: {
        fields: {
          name: {
            type: "string",
            id: 1
          },
          child: {
            rule: "repeated",
            type: "RebateSetPlatformResp",
            id: 4
          }
        }
      },
      RebateSetPlatformResp: {
        fields: {
          validMoney: {
            type: "double",
            id: 1
          },
          rate: {
            type: "double",
            id: 2
          }
        }
      },
      SpreadInfoResp: {
        fields: {
          spreadUrl: {
            type: "string",
            id: 1
          },
          leaderboard: {
            rule: "repeated",
            type: "LeaderboardResp",
            id: 2
          },
          list: {
            rule: "repeated",
            type: "ProportionResp",
            id: 3
          }
        }
      },
      LeaderboardResp: {
        fields: {
          name: {
            type: "string",
            id: 1
          },
          money: {
            type: "double",
            id: 2
          }
        }
      },
      TurntableInfoReq: {
        fields: {
          id: {
            type: "int64",
            id: 1
          }
        }
      },
      TurntableResp: {
        fields: {
          table: {
            type: "AgencyTurntable",
            id: 1
          },
          prizes: {
            rule: "repeated",
            type: "AgencyTurntablePrize",
            id: 2
          },
          num: {
            type: "int64",
            id: 3
          }
        }
      },
      AgencyTurntable: {
        fields: {
          id: {
            type: "int64",
            id: 1
          },
          siteId: {
            type: "string",
            id: 2
          },
          title: {
            type: "string",
            id: 3
          },
          startTime: {
            type: "int64",
            id: 4
          },
          endTime: {
            type: "int64",
            id: 5
          },
          check: {
            type: "int64",
            id: 6
          },
          status: {
            type: "int32",
            id: 7
          },
          siteIndexId: {
            type: "string",
            id: 8
          },
          memberLevelId: {
            type: "string",
            id: 9
          },
          account: {
            type: "string",
            id: 10
          },
          saving: {
            type: "double",
            id: 11
          },
          spending: {
            type: "double",
            id: 12
          },
          createTime: {
            type: "int64",
            id: 13
          },
          updateTime: {
            type: "int64",
            id: 14
          },
          deleteTime: {
            type: "int64",
            id: 15
          },
          version: {
            type: "int64",
            id: 16
          }
        }
      },
      AgencyTurntablePrize: {
        fields: {
          id: {
            type: "int64",
            id: 1
          },
          turntableId: {
            type: "int64",
            id: 2
          },
          siteId: {
            type: "string",
            id: 3
          },
          prizeNo: {
            type: "int64",
            id: 4
          },
          prizeType: {
            type: "int64",
            id: 5
          },
          prizeFrom: {
            type: "int64",
            id: 6
          },
          prizeName: {
            type: "string",
            id: 7
          },
          prizeFee: {
            type: "double",
            id: 8
          },
          prizeChance: {
            type: "int64",
            id: 9
          },
          prizeStock: {
            type: "int64",
            id: 10
          }
        }
      },
      TurntableReceiveReq: {
        fields: {
          turntableId: {
            type: "int64",
            id: 1
          },
          prizeId: {
            type: "int64",
            id: 2
          }
        }
      },
      PrizeResp: {
        fields: {
          id: {
            type: "int64",
            id: 1
          }
        }
      },
      TurntableWinningRecord: {
        fields: {
          turntableTitle: {
            type: "string",
            id: 1
          },
          memberName: {
            type: "string",
            id: 2
          },
          prizeName: {
            type: "string",
            id: 3
          },
          prizeFee: {
            type: "double",
            id: 4
          },
          winningTime: {
            type: "int64",
            id: 5
          }
        }
      },
      TurntableWinningRecordResp: {
        fields: {
          turntableWinningRecord: {
            rule: "repeated",
            type: "TurntableWinningRecord",
            id: 1
          }
        }
      },
      TurnTableOneResp: {
        fields: {
          id: {
            type: "int64",
            id: 1
          },
          title: {
            type: "string",
            id: 2
          },
          prize: {
            rule: "repeated",
            type: "Prize",
            id: 3
          }
        }
      },
      Prize: {
        fields: {
          prizeNo: {
            type: "int64",
            id: 1
          },
          prizeName: {
            type: "string",
            id: 2
          },
          prizeType: {
            type: "int64",
            id: 3
          },
          prizeFee: {
            type: "double",
            id: 4
          }
        }
      },
      WithDrawInfoResp: {
        fields: {
          account: {
            type: "string",
            id: 1
          },
          balance: {
            type: "double",
            id: 2
          },
          has: {
            type: "int64",
            id: 3
          },
          min: {
            type: "double",
            id: 4
          },
          max: {
            type: "double",
            id: 5
          },
          bankList: {
            rule: "repeated",
            type: "BankCardListResp",
            id: 6
          },
          hasP: {
            type: "int64",
            id: 7
          },
          lineAuditAdminRate: {
            type: "double",
            id: 8
          }
        }
      },
      BankCardListResp: {
        fields: {
          id: {
            type: "int64",
            id: 1
          },
          bankName: {
            type: "string",
            id: 2
          },
          card: {
            type: "string",
            id: 3
          },
          subbranch: {
            type: "string",
            id: 4
          },
          isDefault: {
            type: "int64",
            id: 5
          }
        }
      },
      WithDrawAuditReq: {
        fields: {
          outMoney: {
            type: "double",
            id: 1
          },
          drawPassword: {
            type: "string",
            id: 2
          },
          bankId: {
            type: "int64",
            id: 3
          }
        }
      },
      AuditInfoResp: {
        fields: {
          startTime: {
            type: "int64",
            id: 1
          },
          endTime: {
            type: "int64",
            id: 2
          },
          money: {
            type: "double",
            id: 3
          },
          depositMoney: {
            type: "double",
            id: 4
          },
          adminMoney: {
            type: "double",
            id: 5
          },
          outCharge: {
            type: "double",
            id: 6
          },
          auditRelaxQuota: {
            type: "double",
            id: 7
          },
          outMoney: {
            type: "double",
            id: 8
          },
          multiple: {
            type: "int64",
            id: 9
          },
          normal: {
            type: "int64",
            id: 10
          },
          key: {
            type: "string",
            id: 11
          },
          isFirst: {
            type: "int64",
            id: 12
          },
          bankId: {
            type: "int64",
            id: 13
          },
          orderId: {
            type: "string",
            id: 14
          },
          deposit: {
            type: "double",
            id: 15
          },
          betAll: {
            type: "double",
            id: 16
          },
          gameElectronics: {
            type: "double",
            id: 17
          },
          gameVideo: {
            type: "double",
            id: 18
          },
          gameFishing: {
            type: "double",
            id: 19
          },
          gameLottery: {
            type: "double",
            id: 20
          },
          gameSports: {
            type: "double",
            id: 21
          },
          gameChess: {
            type: "double",
            id: 22
          },
          lineAuditAdminRate: {
            type: "double",
            id: 23
          }
        }
      },
      ContinueDrawReq: {
        fields: {
          key: {
            type: "string",
            id: 1
          }
        }
      },
      ContinueDrawResp: {
        fields: {
          orderId: {
            type: "string",
            id: 1
          }
        }
      },
      InstantAuditResp: {
        fields: {
          beginTime: {
            type: "int64",
            id: 1
          },
          endTime: {
            type: "int64",
            id: 2
          },
          deposit: {
            type: "double",
            id: 3
          },
          offer: {
            type: "double",
            id: 4
          },
          bet: {
            type: "double",
            id: 5
          },
          normal: {
            type: "double",
            id: 6
          },
          relax: {
            type: "double",
            id: 7
          },
          adminFee: {
            type: "double",
            id: 8
          },
          multiple: {
            type: "double",
            id: 9
          },
          isNormal: {
            type: "int64",
            id: 10
          },
          isMultiple: {
            type: "int64",
            id: 11
          },
          outCharge: {
            type: "double",
            id: 12
          },
          gameElectronics: {
            type: "double",
            id: 13
          },
          gameVideo: {
            type: "double",
            id: 14
          },
          gameFishing: {
            type: "double",
            id: 15
          },
          gameLottery: {
            type: "double",
            id: 16
          },
          gameSports: {
            type: "double",
            id: 17
          },
          gameChess: {
            type: "double",
            id: 18
          },
          lineAuditAdminRate: {
            type: "double",
            id: 19
          }
        }
      }
    }
  },
  validate: {
    nested: {
      Error: {
        fields: {
          code: {
            type: "int64",
            id: 1
          },
          msg: {
            type: "string",
            id: 2
          }
        }
      }
    }
  }
});

// module.exports = $root;
export default $root;
