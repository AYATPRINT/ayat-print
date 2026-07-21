# Frequently Asked Questions (FAQ)

## Installation & Docker
**Q: I ran `docker compose up` but the API container exits immediately. Why?**
A: This usually happens if the `.env` file is missing or invalid. Check the Docker logs (`docker logs ayat_api`) for Zod validation errors.

**Q: Do I have to use Docker?**
A: No, but it is highly recommended. You can run the React Studio and Node API manually using `npm run dev`, but you will need to provision your own local PostgreSQL and Redis instances.

## Ayat Studio
**Q: The Canvas font rendering looks wrong or broken.**
A: The Arabic typographic engine requires specific `.ttf` font files loaded into the `/assets/fonts` directory. Ensure you haven't stripped these files during the build process.

## Orders & POD
**Q: How does the system choose between Gelato and Sensaria?**
A: The Core API routes based on the destination address. EU/Asia orders default to Gelato, while US/Canada orders route to Sensaria to minimize shipping times and carbon footprint.

## Artificial Intelligence
**Q: What is the Google Gemini API used for?**
A: Gemini is used in the OMS to analyze interior design trends and in the Ayat Studio to suggest color palettes that match a user's uploaded room photo. If you don't supply a `GEMINI_API_KEY`, the app runs in "simulation mode" returning hardcoded fallbacks.
