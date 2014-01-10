/*
Auto-fighting - Normal mob attack (no hitlist attack) Version 1.0

When to attack:
 - As soon as there is any Stamina.
 - There is enough health.
   + If not enough health, heal and try fighting again, if there is enough money in bank.
     - If not enough money in bank, deposit and try to heal again, if there is enough cash.
       + If there is not enough cash, write down required amount and try depositing again where there is enough.

Who to attack:
 - Anyone with mob size < (current_mob_size - 2).
 - Keep a list of last 20 attacked mobsters and do not attack the same ones. The list is FIFO.
 - If there is no suitable mobster to attack, refresh the list and try again.

Usage of auto-attack timer:
 - At least 10 seconds interval (2 minute interval is probably best after debugging is done).
 - 


-----------------------------------
Auto-fighting - Normal mob attack (no hitlist attack) Version 1.1

Smart use of health (stay in hospital tactic):
 - If not in hospital - attack as soon as there is any Stamina.
 - If in hospital - heal only when there is enough Stamina to put us back into hospital (~10 Stamina for starters).

Smart use of health - monitoring:
 - If we don't end up in hospital immediately after healing and attacking with a set number of Stamina
   + Increase the number of Stamina required to heal by 1
 - If we end up in hospital with more than 3 stamina
   + Decrease the number of Stamina required to heal by 1

*/