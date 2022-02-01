//game rule 
const game = {
    treshold: () => {
        if (game.pollution.current < 0) {
            game.pollution.current = 0;
        };
        if (game.income.current < 0) {
            game.income.current = 0
        };
    },
    gameOver: () => {
        if (game.income.current > 1000) {
            window.alert("winner");
            document.location.reload();
        };
        if (game.pollution.current > 1000) {
            window.alert("looser");
            document.location.reload();
        };
    },

    income: {
        current: 0,
        perClick: 1,
        pollution: 7,
        add: () => {
            game.income.current = game.income.current + game.income.perClick;
            game.pollution.current = game.pollution.current + game.income.pollution;
            game.gameOver();
        },
        display: () => {
            $(".incomeDisplay").html(game.income.current);
            $(".extractInfoValue").html(game.income.perClick);
            $(".extractInfoPollution, .addIncomePollutionToScore").html(game.income.pollution);
            $(".addMineralScore").html(game.income.perClick);
        },
        animation:() => {
            $(".addMineralToScore").addClass("addMineralToScoreAnim");
            setTimeout(() => {
                $(".addMineralToScore").removeClass("addMineralToScoreAnim");
            }, 200);
        },
    },

    pollution: {
        current: 0,
        cost: 1,
        perClick: 5,
        reduce: () => {
            if (game.income.current >= game.pollution.cost) {
                game.income.current = game.income.current - game.pollution.cost;
                game.pollution.current = game.pollution.current - game.pollution.perClick;
                game.treshold();
                game.gameOver();
            };
        },
        display: () => {
            $(".pollutionDisplay").html(game.pollution.current);
            $(".pollutionInfoCost, .reducePollutionIncomeToScore").html(game.pollution.cost);
            $(".pollutionInfoValue, .reducePollutionToScore").html(game.pollution.perClick);
        },
        isEnough: () => {
            if (game.income.current <= game.pollution.cost) {
                $(".reducePollution").addClass("notEnough")
            };
            if (game.income.current >= game.pollution.cost) {
                $(".reducePollution").addClass("isEnough")
            };
        },
        animation: () => {
            $(".addPollutionToScore").addClass("addPollutionToScoreAnim");
            setTimeout(() => {
                $(".addPollutionToScore").removeClass("addPollutionToScoreAnim");
            }, 200);
        },
    },

    upgrades: {
        
        income: {
            cost: 3,
            increaseCost: 2,
            perUpgrade: 1,
            pollutionPerUpgrade: 4,
            production: () => {
                if (game.income.current >= game.upgrades.income.cost) {
                    game.income.current = game.income.current - game.upgrades.income.cost;
                    game.income.perClick = game.income.perClick + game.upgrades.income.perUpgrade;
                    game.income.pollution = game.income.pollution + game.upgrades.income.pollutionPerUpgrade;
                    game.upgrades.income.cost = game.upgrades.income.cost + game.upgrades.income.increaseCost;
                    game.treshold();

                };
            },
            display:() => {
                $(".valueUpgradeCost").html(game.upgrades.income.cost);
                $(".valueUpgradeEffect").html(game.income.perClick + game.upgrades.income.perUpgrade);
                $(".valueUpgradePollution").html(game.income.pollution);
            },
            isEnough:() => {
                if (game.income.current < game.upgrades.income.cost) {
                    $(".mineralsValueUpgrade").css({
                        opacity: 0.6,
                        "text-decoration": "line-through",
                        cursor: "not-allowed",
                        transition: "ease-in-out 0.5s",
                    });
                };
                if (game.income.current >= game.upgrades.income.cost) {
                    $(".mineralsValueUpgrade").css({
                        opacity: 1,
                        "text-decoration": "none",
                        cursor: "pointer",
                        transition: "ease-in-out 0.5s",
                    });
                };
            },
            animation:() => {
                if (game.income.current >= game.upgrades.income.cost) {
                    $(".mineralValueCost").addClass("mineralValueCostAnim");
                    setTimeout(function () {
                        $(".mineralValueCost").removeClass("mineralValueCostAnim");
                    }, 200);
                };

            },
        },
        
        pollution: {
            cost: 5,
            lessPolution: 2,
            production: () => {
                if (game.income.current >= game.upgrades.pollution.cost) {
                    game.income.current = game.income.current - game.upgrades.pollution.cost;
                    game.pollution.perClick = game.pollution.perClick + game.upgrades.pollution.lessPolution;
                    game.upgrades.pollution.lessPolution++
                    game.upgrades.pollution.cost = game.upgrades.pollution.cost + 9
                    game.treshold();
                };
            },
            display: () => {
                $(".pollutionUpgradeCost").html(game.upgrades.pollution.cost);
                $(".pollutionUpgradeEffect").html(game.upgrades.pollution.lessPolution);
            },
            isEnough: () => {
                if (game.income.current < game.upgrades.pollution.cost) {
                    $(".greenTicketsValueUpgrade").css({
                        opacity: 0.6,
                        "text-decoration": "line-through",
                        cursor: "not-allowed",
                        transition: "ease-in-out 0.3s",
                    });
                };
                if (game.income.current >= game.upgrades.pollution.cost) {
                    $(".greenTicketsValueUpgrade").css({
                        opacity: 1,
                        "text-decoration": "none",
                        cursor: "pointer",
                        transition: "ease-in-out 0.3s",
                    });
                };
            },
            animation: function () {
                if (game.income.current >= game.upgrades.pollution.cost) {
                    $(".greenTicketsCost").addClass("greenTicketsCostAnim");
                    setTimeout(function () {
                        $(".greenTicketsCost").removeClass("greenTicketsCostAnim");
                    }, 200);
                };

            },
        },
        
        automation: {
            factory: {
                cost: 10,
                income: 0,
                pollution: 0,
                costPerUpgrade: 40,
                incomePerUpgrade: 3,
                pollutionPerUpgrade: 6,
                displayPollution: 0,
                displayIncome: 0,
                speed: 1000,
                isActive: 0,
                production:() => {
                    game.income.current = game.income.current - game.upgrades.automation.factory.cost;
                    game.upgrades.automation.factory.cost = game.upgrades.automation.factory.cost + game.upgrades.automation.factory.costPerUpgrade;
                    game.upgrades.automation.factory.income++;
                    game.upgrades.automation.factory.pollution++;
                },
                prodTime:() => {
                    game.income.current = game.income.current + (game.upgrades.automation.factory.income * game.upgrades.automation.factory.incomePerUpgrade);
                    game.pollution.current = game.pollution.current + (game.upgrades.automation.factory.pollution * game.upgrades.automation.factory.pollutionPerUpgrade);
                    game.gameOver();
                },
                display:() => {
                    $(".factoryCost").html(game.upgrades.automation.factory.cost);
                    $(".factoryIncome").html((game.upgrades.automation.factory.displayIncome = game.upgrades.automation.factory.displayIncome + game.upgrades.automation.factory.incomePerUpgrade));
                    $(".factoryPollution").html((game.upgrades.automation.factory.displayPollution = game.upgrades.automation.factory.displayPollution + game.upgrades.automation.factory.pollutionPerUpgrade));
                    $(".activeFactory").html(game.upgrades.automation.factory.isActive);
                },
                isEnough: () => {
                    if (game.income.current < game.upgrades.automation.factory.cost) {
                        $(".factoryValueUpgrade").css({
                            opacity: 0.8,
                            "text-decoration": "line-through",
                            cursor: "not-allowed",
                            transition: "ease-in-out 0.5s",
                        });
                    };
                    if (game.income.current >= game.upgrades.automation.factory.cost) {
                        $(".factoryValueUpgrade").css({
                            opacity: 1,
                            "text-decoration": "none",
                            cursor: "pointer",
                            transition: "ease-in-out 0.5s",
                        });
                    };
                },
                animation: () => {
                    if (game.income.current >= game.upgrades.automation.factory.cost) {
                        $(".factoryCostScore").addClass("factoryCostScoreAnim");
                        setTimeout( () => {
                            $(".factoryCostScore").removeClass("factoryCostScoreAnim");
                        }, 200);
                    };
                },
            },
           
            greenPower: {
                cost: 10,
                income: 0,
                pollution: 0,
                costPerUpgrade: 80,
                incomePerUpgrade: 1,
                pollutionPerUpgrade: 2,
                displayPollution: 0,
                displayIncome: 0,
                speed: 1000,
                isActive: 0,
                production: () => {
                    game.income.current = game.income.current - game.upgrades.automation.greenPower.cost
                    game.upgrades.automation.greenPower.cost = game.upgrades.automation.greenPower.cost + game.upgrades.automation.greenPower.costPerUpgrade;
                    game.upgrades.automation.greenPower.pollution++;
                    game.upgrades.automation.greenPower.income++;
                },
                prodTime: () => {
                    game.income.current = game.income.current - (game.upgrades.automation.greenPower.income * game.upgrades.automation.greenPower.incomePerUpgrade);
                    game.pollution.current = game.pollution.current - (game.upgrades.automation.greenPower.pollution * game.upgrades.automation.greenPower.pollutionPerUpgrade);
                    game.gameOver();
                    game.income.display();
                    game.pollution.display();
                },
                display: () => {
                    $(".greenPowerCost").html(game.upgrades.automation.greenPower.cost);
                    $(".greenPowerIncome").html(game.upgrades.automation.greenPower.displayIncome = game.upgrades.automation.greenPower.displayIncome + game.upgrades.automation.greenPower.incomePerUpgrade);
                    $(".greenPowerPollution").html(game.upgrades.automation.greenPower.displayPollution = game.upgrades.automation.greenPower.displayPollution + game.upgrades.automation.greenPower.pollutionPerUpgrade);
                    $(".activeGreenPower").html(game.upgrades.automation.greenPower.isActive);
                },
                isEnough: () => {
                    if (game.income.current < game.upgrades.automation.greenPower.cost) {
                        $(".greenEnergyValueUpgrade").css({
                            opacity: 0.8,
                            "text-decoration": "line-through",
                            cursor: "not-allowed",
                            transition: "ease-in-out 0.5s",
                        });
                    };
                    if (game.income.current >= game.upgrades.automation.greenPower.cost) {
                        $(".greenEnergyValueUpgrade").css({
                            opacity: 1,
                            "text-decoration": "none",
                            cursor: "pointer",
                            transition: "ease-in-out 0.5s",
                        });
                    };
                },
                animation:() => {
                    if (game.income.current >= game.upgrades.automation.greenPower.cost) {
                        $(".greenEnergyCost").addClass("greenEnergyCostAnim");
                        setTimeout(function () {
                            $(".greenEnergyCost").removeClass("greenEnergyCost");
                        }, 200);
                    };
                },
            },
        },
    },
};

const {income, pollution, upgrades, automation} = game

$(document).ready(function () {
    //is Enough to build
    const isEnoughRessource = () => {
        pollution.isEnough();
        upgrades.pollution.isEnough();
        upgrades.income.isEnough();
        upgrades.automation.factory.isEnough();
        upgrades.automation.greenPower.isEnough();
    };

    upgrades.income.display();
    upgrades.pollution.display();
    upgrades.automation.greenPower.display();
    upgrades.automation.factory.display();

    setInterval(upgrades.automation.factory.prodTime, 1000);
    setInterval(upgrades.automation.greenPower.prodTime, 1000);
    setInterval(isEnoughRessource, 200);

    //User action
    $(".addIncome").on("click",() => {
        income.add();
        income.animation();
        income.display();
        pollution.display();
    });
    $(".lessPollution").on("click",() => {
        pollution.reduce();
        pollution.animation();
        income.display();
        pollution.display();

    });
    $(".mineralsValueUpgrade").on("click",() => {
        upgrades.income.production();
        upgrades.income.display();
        upgrades.income.animation();
        income.display();
    });
    $(".greenTicketsValueUpgrade").on("click",() => {
        upgrades.pollution.production();
        upgrades.pollution.display();
        upgrades.pollution.animation();
        income.display();
    });
    $(".factoryValueUpgrade").on("click",() => {
        if (income.current >= upgrades.automation.factory.cost) {
            upgrades.automation.factory.production();
            upgrades.automation.factory.animation();
            upgrades.automation.factory.display();
            // console.log(game.upgrades.automation.factory.incomePerUpgrade)
        };
    });
    $(".greenEnergyValueUpgrade").on("click", function () {
        if (income.current >= upgrades.automation.greenPower.cost) {
            upgrades.automation.greenPower.production();
            upgrades.automation.greenPower.animation();
            upgrades.automation.greenPower.display();
        };

    });
});