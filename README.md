# Portfolio Tracker – Plan Działania (Harmonogram)

## Cel projektu

MVP aplikacji do śledzenia inwestycji w różne aktywa (akcje, ETF, krypto, karty
kolekcjonerskie) z bieżącą wyceną portfela i podstawową analizą wyników.

---

## Dzień 1 – Fundamenty projektu

- Zaplanowanie architektury:
    - [ ] Użytkownicy, portfele, aktywa, transakcje, karty kolekcjonerskie
- Określenie minimalnej bazy danych (tylko transakcje + asset info)
    - [ ] Done
- Przygotowanie listy endpointów / komponentów:
    - [ ] Dashboard portfela
    - [ ] CRUD portfela
    - [ ] CRUD aktywów
    - [ ] CRUD transakcji
- Stworzenie ogólnego designu UI / layoutu (prosty wireframe)
    - [ ] Done

---

## Dzień 2 – Autoryzacja i profile

- Implementacja logowania użytkowników (BetterAuth)
    - [ ] Done
- Ochrona tras / danych użytkownika
    - [ ] Done
- CRUD profilu użytkownika (opcjonalnie)
    - [ ] Done
- Testy autoryzacji
    - [ ] Done

---

## Dzień 3 – Portfele i aktywa

- CRUD portfela:
    - [ ] Dodaj, edytuj, usuń
    - [ ] Lista portfeli użytkownika
- CRUD aktywów:
    - [ ] Dodawanie aktywów do portfela
    - [ ] Typy: `STOCK`, `ETF`, `CRYPTO`, `COLLECTIBLE`
    - [ ] Pola: symbol, nazwa, waluta, ostatnia cena
    - [ ] Testy dodawania / edycji / usuwania portfela i aktywów

---

## Dzień 4 – Transakcje

- CRUD transakcji `BUY` / `SELL` dla aktywów
    - [ ] Done
- Obliczanie ilości posiadanej każdego aktywa (runtime)
    - [ ] Done
- Policz wartość inwestycji (`quantity * price`)
    - [ ] Done

---

## Dzień 5 – Integracja z API cen

- Pobieranie bieżących cen z API:
    - [ ] Yahoo Finance / AlphaVantage → akcje, ETF
    - [ ] CoinGecko → kryptowaluty
- Aktualizacja pola `lastPrice` i `lastPriceAt` dla aktywów
    - [ ] Done
- Testy poprawności wyliczeń portfela
    - [ ] Done

---

## Dzień 6 – Dashboard portfela

- Widok szczegółowy portfela:
    - [ ] Total invested
    - [ ] Current value
    - [ ] Profit / Loss
    - [ ] ROI %
    - [ ] Lista aktywów z bieżącą wartością i P/L
    - [ ] W przypadku kolekcjonerskich kart → `estimatedValue`
    - [ ] Prosty wykres wartości portfela (Chart.js / Recharts)

---

## Dzień 7 – Drobne usprawnienia i UX

- [ ] Filtry aktywów po typie
- [ ] Responsywność UI
- [ ] Kolory profit/loss
- [ ] Ikonki / logotypy aktywów
- [ ] Poprawki UX / drobne bugi
- [ ] Przygotowanie do prezentacji / screenów

---

## Dzień 8 – Snapshoty portfela (opcjonalnie)

- Implementacja zapisu snapshotu portfela raz dziennie
    - [ ] Done
- Przechowywanie:
    - [ ] `totalValue`
    - [ ] `invested`
    - [ ] `profit`
- Podstawowe wykresy historyczne z snapshotów
    - [ ] Done
- Testy poprawności
    - [ ] Done

---

## Dzień 9 – Testy końcowe i deployment

- [ ] Sprawdzenie wszystkich funkcjonalności CRUD
- [ ] Testy integracji z API cen
- [ ] Finalne poprawki UI
- [ ] Deployment aplikacji (Vercel + PostgreSQL)
- [ ] Przygotowanie dokumentacji / README z opisem funkcjonalności

---

## Dzień 10 – Dodatki i backlog (opcjonalnie)

- [ ] Integracja CSV import / export transakcji
- [ ] Alerty cenowe
- [ ] Historia cen (`AssetPrice`)
- [ ] Multi-currency
- [ ] Integracja API dla kolekcjonerskich kart
