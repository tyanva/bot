profile = {
//// app ////
    id,             
    balance_BP,              // Баланс 
    claim_time,              // Время до активации клейма --Вопрос--
    profit,                  // Общий доход в час
    energy,                  // Текущее количество енергии
    time_energy,             // Время до востановления 1 ед энергии

////  contracts  //// - тут массив? Их 4 типа и других параметров по 4.
    contract_type,          // тип постройки
    contract_cost,
    contract_available,
    
////  game  ////    - сейвы потом, если игра прервалась, то можно начислять сумму, как за продажу
    game_score,             // счет за игру

//// upgrade ////
    crane_lvl,              // 
    crane_cost,             // 
    crane_available,        // 

    area_lvl,               // 
    area_cost,              // 
    area_available,         // 

    contract_lvl,           // 
    contract_cost,          // 
    contract_available,     // 

    multiplicator_lvl,      // 
    multiplicator_cost,     // 
    multiplicator_available,// 

//// frens ////
    referral_link,
    referral_available,
    // Список друзей с их ИД? Или сразу список со всеми данными?
    fren_rewards,
    fren_name,
    fren_lvl,
    

//// ranks ////

//// tasks ////

}