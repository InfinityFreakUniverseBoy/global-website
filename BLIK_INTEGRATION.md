# BLIK Payment Integration Guide

## Konfiguracja Przelewy24 (P24)

### 1. Utwórz konto na Przelewy24
- Wejdź na https://www.przelewy24.pl
- Zarejestruj się jako merchant
- Uzyskaj:
  - `Merchant ID`
  - `API Key`
  - `CRC Key`

### 2. Dodaj zmienne do `.env`
```env
P24_MERCHANT_ID=your_merchant_id
P24_API_KEY=your_api_key
P24_CRC=your_crc_key
P24_ENVIRONMENT=sandbox  # lub production
```

### 3. Endpoints

#### Inicjuj płatność BLIK (Użytkownik kupuje tokeny)
**POST** `/api/blik/initiate`
```json
{
  "amount": 100.00,
  "userId": 1,
  "description": "Zakup 100 tokenów"
}
```

Odpowiedź:
```json
{
  "success": true,
  "token": "abc123xyz",
  "redirectUrl": "https://secure.przelewy24.pl/?token=abc123xyz"
}
```

#### Callback z Przelewy24
**POST** `/api/blik/callback`
- Przelewy24 wysyła notyfikację po udanej płatności
- System automatycznie dodaje tokeny do konta użytkownika

#### Sprawdź status płatności
**POST** `/api/blik/status`
```json
{
  "sessionId": "1_1234567890"
}
```

#### Withdraw (Model wypłaca)
**POST** `/api/blik/withdraw`
```json
{
  "amount": 50.00,
  "phoneNumber": "+48123456789",
  "userId": 2
}
```

---

## Przepływ Płatności

### 🔵 Użytkownik kupuje tokeny (BLIK)
```
Użytkownik → BLIK Code (6 cyfr) → Przelewy24 → zł → Tokeny
```

1. Użytkownik wpisuje kwotę (np. 100 zł)
2. Otrzymuje link do płatności BLIK
3. Wpisuje 6-cyfrowy kod BLIK z telefonu
4. Po zatwierdzeniu → 100 tokenów na koncie

### 🟣 Model wpłaca tokeny (BLIK Withdraw)
```
Tokeny → Żądanie wypłaty → Przegląd → BLIK → Konto bankowe
```

1. Model wpisuje kwotę tokenów do wypłaty
2. Podaje numer telefonu do BLIK
3. System przetwusza (manualnie lub auto)
4. Pieniądze trafiają na konto

---

## Prowizja (35% dla Ciebie)

Każda transakcja model → tokeny:
- **Model otrzyma**: 65% kwoty
- **Ty otrzymasz**: 35% kwoty

Przykład:
- Użytkownik wyśle modelowi **100 tokenów**
- Model otrzyma: **65 tokenów** (65 zł)
- Ty otrzymasz: **35 tokenów** (35 zł)

---

## Bezpieczeństwo

⚠️ **WAŻNE:**
- Nigdy nie pokazuj P24_CRC w kodzie frontend
- Zawsze weryfikuj sygnaturę callbacku
- Używaj HTTPS w produkcji
- Dodaj rate limiting na endpoints płatności

---

## Testing

### Sandbox mode
Zmień w `.env`:
```env
P24_ENVIRONMENT=sandbox
```

Testowe kody BLIK: `777777` (zawsze sukces)

### Test kody BLIK:
- `777777` - Success
- `888888` - Failure
- `999999` - Timeout

---

## Integracja w Frontend

```html
<form id="buyTokensForm">
  <input type="number" id="amount" placeholder="Kwota (PLN)" required>
  <button type="submit">Kup tokeny BLIK</button>
</form>

<script>
async function buyTokens(event) {
  event.preventDefault();
  const amount = document.getElementById('amount').value;
  
  const response = await fetch('/api/blik/initiate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount, userId: currentUser.id })
  });
  
  const data = await response.json();
  window.location.href = data.redirectUrl; // Redirect to Przelewy24
}
</script>
```

