// ===== STUDENT ENQUIRY SYSTEM - SEPARATE MODULE =====
(function(){
  // CSS Inject
  const style = document.createElement('style');
  style.innerHTML = `
  .hero-btn.enquiry{background:#ffffff;color:#174a7e;border:1.5px solid #cbd5e1;}
  .hero-btn.enquiry:hover{background:#f8fafc;border-color:#174a7e;transform:translateY(-2px);}
  .enquiry-modal .modal-content{border-radius:20px;border:none;box-shadow:0 25px 70px rgba(15,23,42,.22);background:#fff;}
  .enquiry-modal .modal-header{padding:16px;border:none;display:flex;justify-content:flex-end;}
  .enquiry-modal .btn-close{background-color:#f1f5f9;border-radius:50%;width:26px;height:26px;opacity:1;background-size:10px;}
  .enquiry-modal .modal-body{padding:0 20px 20px 20px;}
  .enquiry-field{position:relative;}
  .enquiry-field i.bi:first-child{position:absolute;left:14px;top:50%;transform:translateY(-50%);color:#94a3b8;font-size:15px;pointer-events:none;}
  .enquiry-field input{width:100%;border:1.5px solid #e2e8f0;border-radius:14px;padding:14px 46px 14px 40px;font-size:13.5px;outline:none;background:#f8fafc;font-weight:500;}
  .enquiry-field input:focus{border-color:#174a7e;background:#fff;box-shadow:0 0 0 4px rgba(23,74,126,.08);}
  .enquiry-send{position:absolute;right:6px;top:50%;transform:translateY(-50%);width:36px;height:36px;border-radius:11px;border:none;background:#174a7e;color:white;display:flex;align-items:center;justify-content:center;}
  .enquiry-send:hover{background:#25D366;}
  `;
  document.head.appendChild(style);

  // Modal HTML Inject
  const modalHTML = `
  <div class="modal fade enquiry-modal" id="studentEnquiryModal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered" style="max-width:380px;">
      <div class="modal-content">
        <div class="modal-header"><button type="button" class="btn-close" data-bs-dismiss="modal"></button></div>
        <div class="modal-body">
          <div class="enquiry-field">
            <i class="bi bi-chat-left-text"></i>
            <input id="studentEnquiryInput" type="text" placeholder="अपना संदेश लिखें..." />
            <button class="enquiry-send" onclick="sendStudentEnquiry()"><i class="bi bi-send-fill"></i></button>
          </div>
          <div style="font-size:11px;color:#64748b;text-align:center;margin-top:10px;display:flex;align-items:center;justify-content:center;gap:5px;"><i class="bi bi-whatsapp" style="color:#25D366;"></i> सीधा सर के WhatsApp पर</div>
        </div>
      </div>
    </div>
  </div>`;
  document.body.insertAdjacentHTML('beforeend', modalHTML);

  // Auto Read Function
  window.openEnquiryModal = function(e){
    if(e) e.preventDefault();
    new bootstrap.Modal(document.getElementById('studentEnquiryModal')).show();
    setTimeout(()=>document.getElementById('studentEnquiryInput').focus(),300);
  }

  window.sendStudentEnquiry = function(){
    let msg = document.getElementById('studentEnquiryInput').value.trim();
    if(!msg){ document.getElementById('studentEnquiryInput').focus(); return; }

    // ===== AUTO READ NAME / CLASS / PHONE =====
    let name = document.getElementById('studentName')?.innerText.trim() 
            || window.currentStudent?.name || window.studentData?.name 
            || localStorage.getItem('studentName') || "छात्र";

    let sClass = document.getElementById('studentInfo')?.innerText.trim()
            || window.currentStudent?.class || window.currentStudent?.course
            || localStorage.getItem('studentClass') || "N/A";
    if(sClass.length > 50) sClass = sClass.substring(0,50);

    let phone = window.currentStudent?.phone || window.currentStudent?.mobile 
            || window.studentData?.phone || localStorage.getItem('studentPhone') 
            || localStorage.getItem('phone') || "नंबर उपलब्ध नहीं";

    // ===== WHATSAPP TO YOU (ADMIN) =====
    let finalMsg = `*Student Message*\n\n👤 नाम: ${name}\n🎓 ${sClass}\n📱 छात्र का नंबर: ${phone}\n\n💬 संदेश: ${msg}\n\n_Reply करने के लिए इस नंबर पर क्लिक करें: https://wa.me/91${phone.replace(/\D/g,'').slice(-10)}_`;

    window.open(`https://wa.me/919425123350?text=${encodeURIComponent(finalMsg)}`,'_blank');
  }

  document.addEventListener('keypress', function(e){
    if(e.target.id === 'studentEnquiryInput' && e.key === 'Enter'){ sendStudentEnquiry(); }
  });
})();