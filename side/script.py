# Side-hustle taxes video: narration paragraphs + scenes.
# scene "at" = sentence index inside the paragraph where the scene starts.
P = []
def para(text, *scenes):
    P.append({"text": text.strip(), "scenes": list(scenes)})

# 0 intro + question
para("""Quick question before we start. If you sell things online, drive for an app, or clean houses for cash, and no tax form ever shows up in your mailbox, do you still owe tax? Yes or no. Tell me your answer in the comments. Today I'll show you the real answer with real numbers, because this is the mistake that sends thousands of side hustlers an IRS letter every year.""",
 {"at":0,"type":"photo","img":"paycheck","k":"SIDE HUSTLE TAXES 2026","h":"No tax form came.","sub":"Do you still owe tax?"},
 {"at":2,"type":"big","k":"YOUR GUESS","v":"Yes or No?","sub":"Tell me in the comments"},
 {"at":4,"type":"photo","img":"setax","k":"THE COSTLY MISTAKE","h":"The IRS letter nobody expects","sub":"Real numbers, step by step"})

# 1 short answer
para("""Here's the short answer: yes. The IRS says you must report all of your income, whether or not you get a Form 1099. The forms are just how the IRS gets a copy of what you were paid. They don't decide what is taxable. Your income does. So a side hustle with no paperwork is still a side hustle the IRS expects to see on your return.""",
 {"at":0,"type":"big","k":"SHORT ANSWER","v":"YES","sub":"Report all income, form or no form"},
 {"at":2,"type":"cards","k":"WHAT A 1099 IS","items":[["Form","A copy for the IRS"],["Income","What is taxable"],["No form","Still taxable"]]})

# 2 how the IRS sees it
para("""So how does the IRS actually see your side income? Mostly through three forms. First, Form 1099-NEC. A business that pays you for services sends it once they pay you at least $2,000 in 2026. That limit went up from $600 this year. Second, Form 1099-K. Payment apps and online marketplaces send it when you get more than $20,000 and more than 200 payments in a year. And if customers pay you with a credit card through a card processor, there is no minimum at all. Third, Form 1099-MISC for things like rent and prizes.""",
 {"at":0,"type":"photo","img":"gig","k":"HOW THE IRS SEES IT","h":"Three forms carry your income","sub":"1099-NEC, 1099-K, 1099-MISC"},
 {"at":1,"type":"table","k":"THE 2026 THRESHOLDS","head":["Form","Who sends it","Sent when"],"rows":[["1099-NEC","Business that pays you","$2,000 or more"],["1099-K (apps)","Payment app, marketplace","Over $20,000 AND over 200 payments"],["1099-K (cards)","Card processor","Any amount"],["1099-MISC","Rent, prizes, other","$600 or more"]]},
 {"at":6,"type":"big","k":"1099-K FOR APPS","v":"$20,000 + 200","sub":"Both limits must be passed"})

# 3 matching
para("""Every one of those forms also goes to the IRS. Their computers match the forms against your tax return. If a form says you were paid and your return doesn't show it, the system flags it, and months later you get a notice called a CP2000. It proposes extra tax, plus interest, and sometimes a penalty. Here's the important part. Being under the limits doesn't make the income disappear. It only means nobody sent a form. The tax is the same.""",
 {"at":0,"type":"list","k":"THE MATCHING SYSTEM","items":["Forms go to you AND the IRS","Computers match them to your return","Missing income gets flagged","Months later: a CP2000 notice"]},
 {"at":2,"type":"photo","img":"paycheck","k":"CP2000 NOTICE","h":"\"We found income you didn't report\"","sub":"Extra tax + interest, sometimes a penalty"},
 {"at":4,"type":"big","k":"REMEMBER","v":"No form ≠ no tax","sub":"Under the limit, same tax"})

# 4 example intro
para("""Let's walk through a real example. Meet Jordan. In 2026 Jordan has a regular job, plus three side hustles. Jordan sells handmade candles on Etsy: 180 orders and $14,600 in sales. Jordan drives for a delivery app on weekends and earns $9,800. And Jordan cleans a few homes for neighbors, paid $3,200 in cash and Venmo.""",
 {"at":0,"type":"photo","img":"etsy","k":"REAL EXAMPLE","h":"Meet Jordan","sub":"A day job plus three side hustles"},
 {"at":3,"type":"cards","k":"JORDAN'S 2026 SIDE INCOME","items":[["$14,600","Etsy, 180 orders"],["$9,800","Delivery app"],["$3,200","Cleaning, cash + Venmo"]]})

# 5 which forms
para("""So which forms does Jordan get? From Etsy, none. $14,600 is under $20,000, and 180 orders is under 200. From the delivery app, Jordan probably gets a 1099-NEC, because $9,800 is well over $2,000. From the cleaning clients, nothing. Individuals paying for help around the house don't send 1099s. So Jordan earned $27,600 on the side, and only $9,800 of it shows up on a form. The other $17,800 is still fully taxable.""",
 {"at":0,"type":"table","k":"WHICH FORMS ARRIVE?","head":["Side hustle","Paid","Form?"],"rows":[["Etsy","$14,600","None (under $20K and 200)"],["Delivery app","$9,800","1099-NEC"],["Cleaning","$3,200","None"],["Total","$27,600","Only $9,800 on a form"]]},
 {"at":7,"type":"big","k":"NOT ON ANY FORM","v":"$17,800","sub":"Still fully taxable"})

# 6 expenses
para("""Now the good news. Jordan only pays tax on profit, not on sales. On Etsy, fees, wax, jars, and shipping cost $6,100, so the profit is $8,500. For driving, Jordan logs 3,000 business miles from January to June at 72.5 cents, and 3,000 miles from July to December at the new 76 cents. That gives a deduction of $4,455, so the driving profit is $5,345. Cleaning supplies were $150, so that profit is $3,050. Total side profit: $16,895.""",
 {"at":0,"type":"photo","img":"cleaning","k":"THE GOOD NEWS","h":"You pay tax on profit, not sales","sub":"Every real expense lowers the bill"},
 {"at":1,"type":"calc","k":"PROFIT, NOT SALES","lines":[["Etsy: $14,600 − $6,100","$8,500"],["Driving: $9,800 − $4,455 miles","$5,345"],["Cleaning: $3,200 − $150","$3,050"]],"total":["Total side profit","$16,895"]},
 {"at":3,"type":"cards","k":"2026 MILEAGE RATES","items":[["72.5¢","Jan 1 to Jun 30"],["76¢","Jul 1 to Dec 31"],["$4,455","6,000 miles"]]})

# 7 SE tax
para("""On that profit, Jordan owes self-employment tax. That's Social Security and Medicare for people who work for themselves. You take 92.35% of the profit, which is $15,602.53, and multiply by 15.3%. That's $2,387.19 in self-employment tax. And that is before regular income tax, which comes on top at Jordan's normal bracket. The good news: half of the self-employment tax, $1,193.59, is a deduction on Form 1040.""",
 {"at":0,"type":"photo","img":"selfemployed","k":"SELF-EMPLOYMENT TAX","h":"Social Security + Medicare","sub":"15.3% on 92.35% of profit"},
 {"at":2,"type":"calc","k":"JORDAN'S SE TAX","lines":[["Side profit","$16,895.00"],["× 92.35%","$15,602.53"],["× 15.3%","$2,387.19"]],"total":["Self-employment tax","$2,387.19"]},
 {"at":4,"type":"big","k":"PLUS","v":"Income tax","sub":"At Jordan's normal bracket"})

# 8 $400 rule
para("""One more rule people miss. If your net profit from self-employment is $400 or more, you generally have to file Schedule SE and pay this tax, even if your total income is low and you otherwise wouldn't need to file. Four hundred dollars. That's a few weekends of dog walking.""",
 {"at":0,"type":"big","k":"THE $400 RULE","v":"$400","sub":"Net profit that triggers Schedule SE"},
 {"at":2,"type":"photo","img":"lawn","k":"SMALL GIGS COUNT","h":"A few weekends of work","sub":"Can be enough to file"})

# 9 mistakes header + mistake 1-2
para("""Now let's go through the five most common side hustle tax mistakes. Mistake number one: thinking no form means no tax. We just covered it. It's still income. Mistake number two: forgetting expenses. If Jordan reported $27,600 of sales with zero expenses, the self-employment tax alone would be $3,899.76. Tracking expenses saves Jordan $1,512.57 in that tax alone, before income tax.""",
 {"at":0,"type":"list","k":"5 COMMON MISTAKES","items":["1. No form = no tax","2. Forgetting expenses","3. Selling personal items wrong","4. Skipping quarterly payments","5. Mixing money"]},
 {"at":4,"type":"calc","k":"FORGET EXPENSES, PAY MORE","lines":[["SE tax on $27,600 sales","$3,899.76"],["SE tax on $16,895 profit","$2,387.19"]],"total":["Saved by tracking expenses","$1,512.57"]})

# 10 mistake 3
para("""Mistake number three: treating every sale the same. Selling your own used stuff for less than you paid, like an old couch or last year's jacket, is not taxable income. But if you sell something for more than you paid, that gain is taxable. And if you buy things to resell, that's a business. If you get a 1099-K for personal items you sold at a loss, you still report it, and you show what you paid so the gain is zero. Keep your receipts.""",
 {"at":0,"type":"photo","img":"airbnb","k":"MISTAKE 3","h":"Personal items vs. a business","sub":"Know which one you have"},
 {"at":1,"type":"table","k":"IS IT TAXABLE?","head":["You sold","Example","Taxable?"],"rows":[["Personal item at a loss","Couch: paid $900, sold $300","No"],["Personal item at a gain","Card: paid $50, sold $400","Yes, the $350 gain"],["Items bought to resell","Thrift flips","Yes, business profit"]]})

# 11 mistake 4
para("""Mistake number four: skipping quarterly payments. Your day job withholds tax from your paycheck, but nobody withholds from your side income. If you expect to owe $1,000 or more when you file, the IRS generally wants estimated payments during the year. The next deadline for 2026 income is January 15, 2027. An easy fix is to raise the withholding at your day job with a new W-4, so the extra tax comes out of every paycheck.""",
 {"at":0,"type":"photo","img":"freelance","k":"MISTAKE 4","h":"Nobody withholds from side income","sub":"You have to pay as you go"},
 {"at":2,"type":"cards","k":"PAY AS YOU GO","items":[["$1,000+","Expected tax due"],["Jan 15, 2027","Next estimated payment"],["New W-4","Or raise day-job withholding"]]})

# 12 mistake 5
para("""Mistake number five: mixing personal and business money. When your Etsy payouts, cash jobs, and grocery runs all hit one account, you will miss income and miss deductions. Open a free second checking account just for the side hustle, and write down every sale and every expense once a week. It takes ten minutes.""",
 {"at":0,"type":"photo","img":"bookkeeping","k":"MISTAKE 5","h":"One account for everything","sub":"Separate it, track it weekly"},
 {"at":2,"type":"list","k":"10-MINUTE WEEKLY HABIT","items":["Separate checking account","Log every sale","Log every expense + receipt","Log business miles"]})

# 13 hobby
para("""What if your side hustle is really a hobby? Hobby income is still taxable. The difference is that hobby expenses generally can't be deducted. So if you're trying to make a profit, run it like a business: keep records, a separate account, and a simple plan. That's what lets you deduct your costs.""",
 {"at":0,"type":"cards","k":"HOBBY VS. BUSINESS","items":[["Hobby","Income taxable, costs not deductible"],["Business","Income taxable, costs deductible"]]},
 {"at":2,"type":"photo","img":"booth","k":"RUN IT LIKE A BUSINESS","h":"Records + separate account","sub":"That is what unlocks deductions"})

# 14 calculator
para("""If you want to run your own numbers, I built free calculators on bookkeepingsheets.com. The self-employment tax calculator does this exact math, and the mileage calculator handles the two 2026 rates for you. The links are in the description.""",
 {"at":0,"type":"photo","img":"setax","k":"FREE TOOLS","h":"Run your own numbers","sub":"bookkeepingsheets.com"},
 {"at":1,"type":"list","k":"FREE ON BOOKKEEPINGSHEETS.COM","items":["Self-employment tax calculator","Mileage deduction calculator","Quarterly estimated tax calculator","Self-employed income + expense tracker"]})

# 15 recap
para("""Quick recap. Report all side income, form or no form. 1099-K from apps comes after $20,000 and 200 payments, and 1099-NEC after $2,000 in 2026. Pay tax on profit, so track every expense. Owe self-employment tax once profit hits $400. And pay as you go. So, did you guess yes at the start? Tell me in the comments, and subscribe for more money math every week.""",
 {"at":0,"type":"list","k":"RECAP","items":["Report all income, form or no form","1099-K: $20K + 200 | 1099-NEC: $2,000","Tax is on profit: track expenses","SE tax from $400 of profit","Pay as you go"]},
 {"at":6,"type":"outro","h":"Did you guess YES?","sub":"Tell me in the comments · Subscribe for weekly money math","url":"bookkeepingsheets.com"})

if __name__ == "__main__":
    import json, re
    w = sum(len(p["text"].split()) for p in P)
    print("paragraphs", len(P), "words", w)
    for i, p in enumerate(P):
        n = len(re.split(r'(?<=[.!?])\s+', p["text"]))
        for s in p["scenes"]:
            assert s["at"] < n, (i, s["at"], n)
    json.dump(P, open("plan_src.json", "w"), indent=1)
