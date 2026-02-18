import type { Metadata } from 'next'
import LegalPage from '@/components/LegalPage'

export const metadata: Metadata = {
  title: 'Return & Refund Policy — Bakeanaut',
  description:
    'Return and refund policy for Bakeanaut. Learn about our policies on returns, refunds, and exchanges.',
}

export default function ReturnRefundPage() {
  return (
    <LegalPage title="Return & Refund Policy">
      <h2>Definitions and Key Terms</h2>
      <p>
        To help explain things as clearly as possible in this Return &amp; Refund
        Policy, every time any of these terms are referenced, are strictly
        defined as:
      </p>
      <ul>
        <li>
          <strong>Company:</strong> when this policy mentions &quot;Company&quot;,
          &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;, it refers to
          Bakeanaut, that is responsible for your information under this Return
          &amp; Refund Policy.
        </li>
        <li>
          <strong>Customer:</strong> refers to the company, organization or
          person that signs up to use the Bakeanaut Service to manage the
          relationships with your consumers or service users.
        </li>
        <li>
          <strong>Device:</strong> any internet connected device such as a phone,
          tablet, computer or any other device that can be used to visit
          Bakeanaut and use the services.
        </li>
        <li>
          <strong>Service:</strong> refers to the service provided by Bakeanaut
          as described in the relative terms (if available) and on this platform.
        </li>
        <li>
          <strong>Website:</strong> Bakeanaut, which can be accessed via this
          URL: https://www.bakeanaut.in
        </li>
        <li>
          <strong>You:</strong> a person or entity that is registered with
          Bakeanaut to use the Services.
        </li>
      </ul>

      <h2>Return &amp; Refund Policy</h2>
      <p>
        Thanks for shopping at Bakeanaut. We appreciate the fact that you like to
        buy the stuff we build. We also want to make sure you have a rewarding
        experience while you&apos;re exploring, evaluating, and purchasing our
        products.
      </p>
      <p>
        As with any shopping experience, there are terms and conditions that
        apply to transactions at Bakeanaut. We will be as brief as our attorneys
        will allow. The main thing to remember is that by placing an order or
        making a purchase at Bakeanaut, you agree to the terms set forth below
        along with our Privacy Policy.
      </p>
      <p>
        If there is something wrong with the product/service you bought, or if
        you are not happy with it, you will not be able to issue a refund for
        your item.
      </p>

      <h2>Refunds</h2>
      <p>
        We at Bakeanaut pride ourselves to serving our customers with the best
        products. Every single product that you choose is thoroughly inspected,
        checked for defects and packaged with utmost care. We do this to ensure
        that you fall in love with our products.
      </p>
      <p>
        Sadly, there are times when we may not have the product(s) that you
        choose in stock, or may face some issues with our inventory and quality
        check. In such cases, we may have to cancel your order. You will be
        intimated about it in advance so that you don&apos;t have to worry
        unnecessarily about your order. If you have purchased via Online payment
        (not Cash on Delivery), then you will be refunded once our team confirms
        your request.
      </p>
      <p>
        We carry out thorough quality check before processing the ordered item.
        We take utmost care while packing the product. At the same time we ensure
        that the packing is good such that the items won&apos;t get damaged
        during transit. Please note that Bakeanaut is not liable for damages that
        are caused to the items during transit or transportation.
      </p>
      <p>
        We follow certain policies to ensure transparency, efficiency and quality
        customer care:
      </p>
      <ul>
        <li>We DO NOT allow returns on sold products - online.</li>
        <li>
          We DO NOT accept returned goods, as we believe that customers should
          get the best quality products.
        </li>
        <li>
          Refunds are NOT given for any purchases made - be they online.
        </li>
        <li>We DO NOT encourage exchanges of our products.</li>
        <li>
          We DO NOT engage in reselling used products and discourage the same,
          because we cannot ensure the best quality products for our customers.
        </li>
      </ul>

      <h2>For International Orders</h2>
      <ul>
        <li>We DO NOT support Exchanges or Returns.</li>
        <li>
          If you cancel the order before we process it and dispatch for shipping,
          a refund can be processed. Orders generally take 1-2 days to process
          before dispatch.
        </li>
        <li>
          Orders already in shipping cannot be returned, cancelled or refunded.
        </li>
        <li>
          If you face any issues, please contact our Support Team immediately.
        </li>
      </ul>

      <h2>Your Consent</h2>
      <p>
        By using our website, registering an account, or making a purchase, you
        hereby consent to our Return &amp; Refund Policy and agree to its terms.
      </p>

      <h2>Changes To Our Return &amp; Refund Policy</h2>
      <p>
        Should we update, amend or make any changes to this document so that they
        accurately reflect our Service and policies. Unless otherwise required by
        law, those changes will be prominently posted here. Then, if you continue
        to use the Service, you will be bound by the updated Return &amp; Refund
        Policy. If you do not want to agree to this or any updated Return &amp;
        Refund Policy, you can delete your account.
      </p>

      <h2>Contact Us</h2>
      <p>
        If, for any reason, You are not completely satisfied with any good or
        service that we provide, don&apos;t hesitate to contact us and we will
        discuss any of the issues you are going through with our product.
      </p>
      <ul>
        <li>
          Via Email:{' '}
          <a href="mailto:bakeanaut@gmail.com">bakeanaut@gmail.com</a>
        </li>
      </ul>
    </LegalPage>
  )
}
