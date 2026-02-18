import type { Metadata } from 'next'
import LegalPage from '@/components/LegalPage'

export const metadata: Metadata = {
  title: 'Shipping & Delivery Policy — Bakeanaut',
  description:
    'Shipping and delivery policy for Bakeanaut. Learn about our shipping methods, fees, and delivery options.',
}

export default function ShippingPage() {
  return (
    <LegalPage title="Shipping & Delivery Policy">
      <p>
        This Shipping &amp; Delivery Policy is part of our Terms and Conditions
        (&quot;Terms&quot;) and should be therefore read alongside our main
        terms.
      </p>
      <p>
        Please carefully review our Shipping &amp; Delivery Policy when
        purchasing our products. This policy will apply to any order you place
        with us.
      </p>

      <h2>What Are My Shipping and Delivery Options?</h2>

      <h3>In-Store Pickup</h3>
      <p>
        In-store pickup is available for cookies. Pickups are available from
        Monday - Sunday: 10:00 AM to 10:00 PM.
      </p>
      <p>
        We offer various shipping methods. In some cases a third-party supplier
        may be responsible for shipping our products.
      </p>

      <h3>Shipping Fees</h3>
      <p>We offer shipping at the following rates:</p>
      <ul>
        <li>
          <strong>Shipping Method:</strong> Ship Rocket / Porter / Delhivery
        </li>
        <li>
          <strong>Shipping Fee:</strong> Calculated based on distance
        </li>
      </ul>
      <p>Your order will be delivered within 2-4 days.</p>
      <p>
        All times and dates given for delivery of the products are given in good
        faith but are estimates only.
      </p>

      <h2>Do You Deliver Internationally?</h2>
      <p>We do not offer international shipping.</p>

      <h2>Questions About Returns?</h2>
      <p>
        If you have any queries about returns, please review our{' '}
        <a href="/return-refund">Return &amp; Refund Policy</a>.
      </p>

      <h2>How Can You Contact Us About This Policy?</h2>
      <p>
        If you have any further questions or comments, you may contact us by:
      </p>
      <ul>
        <li>
          Email:{' '}
          <a href="mailto:bakeanaut@gmail.com">bakeanaut@gmail.com</a>
        </li>
      </ul>
    </LegalPage>
  )
}
