-- ============================================================
-- Nivo Partners | Supabase Database Trigger Setup
-- Run this SQL in: Supabase Dashboard → SQL Editor
-- ============================================================

-- 1. Create the trigger function that calls the Edge Function
CREATE OR REPLACE FUNCTION notify_new_lead_trigger()
RETURNS TRIGGER AS $$
DECLARE
  payload jsonb;
BEGIN
  -- Build the payload with the new lead record
  payload := jsonb_build_object(
    'record', jsonb_build_object(
      'name',         NEW.name,
      'email',        NEW.email,
      'company',      NEW.company,
      'service',      NEW.service,
      'requirements', NEW.requirements
    )
  );

  -- Call the Edge Function asynchronously via pg_net
  PERFORM net.http_post(
    url     := 'https://YOUR_SUPABASE_PROJECT_REF.supabase.co/functions/v1/notify-new-lead',
    headers := jsonb_build_object(
      'Content-Type',  'application/json',
      'Authorization', 'Bearer ' || current_setting('app.supabase_service_key', true)
    ),
    body    := payload
  );

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Attach the trigger to the leads table
DROP TRIGGER IF EXISTS on_new_lead ON leads;

CREATE TRIGGER on_new_lead
  AFTER INSERT ON leads
  FOR EACH ROW
  EXECUTE FUNCTION notify_new_lead_trigger();

-- ============================================================
-- INSTRUCTIONS:
-- 1. Replace YOUR_SUPABASE_PROJECT_REF with your project ref
--    (found in: Settings → API → Project URL)
-- 2. Run this entire script in SQL Editor
-- 3. Test by submitting a form on nivopartners.com
-- ============================================================
